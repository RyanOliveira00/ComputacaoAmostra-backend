import { configurationService } from '@app/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSessionDto } from './dto/session-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async generateSession(sessionDto: CreateSessionDto) {
    const sessionPayload = { ...sessionDto };
    const user = await this.findOne({ email: sessionDto.email });

    if (!user) {
      await this.create({ name: sessionDto.name, email: sessionDto.email });
    }

    const token = await this.jwtService.signAsync(sessionPayload, {
      secret: configurationService.getValue('JWT_SECRET'),
      expiresIn: configurationService.getValue('JWT_EXPIRE'),
    });

    return token;
  }

  async findOne(where: FindOptionsWhere<User>) {
    return await this.usersRepository.findOne({ where });
  }

  async validateCaptcha(captchaResponse: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post('https://www.google.com/recaptcha/api/siteverify', {
          secret: configurationService.getValue('CAPTCHA_SECRET'),
          response: captchaResponse,
        })
        .pipe(
          catchError(() => {
            throw 'Unexpected error';
          }),
        ),
    );
    return data;
  }
}
