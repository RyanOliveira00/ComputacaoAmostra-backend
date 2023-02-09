import { configurationService } from '@app/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
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
