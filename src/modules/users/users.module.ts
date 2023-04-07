import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { VotesModule } from 'src/modules/votes/votes.module';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    VotesModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
