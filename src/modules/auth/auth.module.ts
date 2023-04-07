import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
