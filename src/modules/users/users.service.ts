import { configurationService } from '@app/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { VotesService } from '../votes/votes.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateSessionDto } from './dto/session-dto';
import { JwtService } from '@nestjs/jwt';
import { AccessException, TokenException } from '@app/common';
import { SessionPayload } from '../../@types/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly voteService: VotesService,
    private readonly jwtService: JwtService,
    private readonly projectService: ProjectsService,
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

  async vote(createVoteDto: CreateVoteDto, session: string) {
    try {
      await this.jwtService.verify(session, {
        secret: configurationService.getValue('JWT_SECRET'),
      });
      return 'sexo';
      // return await this.voteService.create(createVoteDto);
    } catch (error) {
      throw new TokenException();
    }
  }
}
