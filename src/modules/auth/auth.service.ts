import { JwtService } from '@nestjs/jwt';
import { configurationService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenException } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generateSession(sessionDto: CreateSessionDto) {
    const sessionPayload = { ...sessionDto };
    const user = await this.userRepository.findOne({
      where: { email: sessionDto.email },
    });

    if (!user) {
      const newUser = this.userRepository.create({
        name: sessionDto.name,
        email: sessionDto.email,
      });
      await this.userRepository.save(newUser);
    }

    const token = await this.jwtService.signAsync(sessionPayload, {
      secret: configurationService.getValue('JWT_SECRET'),
      expiresIn: configurationService.getValue('JWT_EXPIRE'),
    });

    return token;
  }

  async verifySession(session: string) {
    try {
      return await this.jwtService.verify(session, {
        secret: configurationService.getValue('JWT_SECRET'),
      });
    } catch (error) {
      throw new TokenException();
    }
  }
}
