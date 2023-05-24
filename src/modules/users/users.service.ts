import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { configurationService } from '../../config/config.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(where: FindOptionsWhere<User>) {
    return await this.usersRepository.findOne({ where, relations: ['votes'] });
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['votes', 'votes.projectId'],
      select: { votes: { createdAt: true, projectId: true } },
    });
    return users.sort((a, b) => a.voteCount - b.voteCount).reverse();
  }

  async validateCaptcha(
    captchaResponse: string,
  ): Promise<{ success?: string; error?: string }> {
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${configurationService.getValue(
            'CAPTCHA_SECRET'
          )}&response=${captchaResponse.replace('\"', '')}`,
        )
        .pipe(
          catchError(() => {
            throw 'Unexpected error';
          }),
        ),
    );
    return data;
  }
}
