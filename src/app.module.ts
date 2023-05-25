import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configurationService } from './config/config.service';
import { AdminModule } from './modules/admin/admin.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: '/',
    }),
    ConfigModule.forRoot(),
    ThrottlerModule.forRootAsync(configurationService.getThrottleConfig()),
    TypeOrmModule.forRootAsync(
      configurationService.getTypeOrmConfig(__dirname),
    ),
    GoogleRecaptchaModule.forRootAsync(configurationService.getGoogleCaptchaConfig()),
    HttpModule.register(configurationService.getHttpModuleConfig()),
    JwtModule.register({}),
    UsersModule,
    ProjectsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
