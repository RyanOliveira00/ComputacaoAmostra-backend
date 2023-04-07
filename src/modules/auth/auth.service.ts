import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenException } from 'src/common/exceptions/invalid-token';
import { configurationService } from 'src/config/config.service';
import { Repository } from 'typeorm';
import { SessionPayload } from 'src/@types/index';
import { User } from 'src/modules/users/entities/user.entity';
import { CreateSessionDto } from 'src/modules/auth/dto/create-session.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async generateSession(sessionDto: CreateSessionDto) {
    let user = await this.userRepository.findOne({
      where: { email: sessionDto.email },
    });

    if (!user) {
      user = this.userRepository.create({
        name: sessionDto.name,
        email: sessionDto.email,
      });
      await this.userRepository.save(user);
    }

    const token = await this.jwtService.signAsync(
      { ...sessionDto, sub: user.id },
      {
        secret: configurationService.getValue('JWT_SECRET'),
        expiresIn: configurationService.getValue('JWT_EXPIRE'),
      },
    );

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

  async getUser(session: string) {
    try {
      const payload = this.jwtService.decode(session) as SessionPayload;
      return payload;
    } catch (error) {
      throw new TokenException();
    }
  }
}
