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
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly voteService: VotesService,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
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

  async vote(createVoteDto: CreateVoteDto) {
    return await this.voteService.create(createVoteDto);
  }
}
