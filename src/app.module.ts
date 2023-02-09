import { AdminModule, ProjectsModule, UsersModule } from '@app/modules';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configurationService } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(configurationService.getThrottleConfig()),
    TypeOrmModule.forRoot(configurationService.getTypeOrmConfig(__dirname)),
    HttpModule.register(configurationService.getHttpModuleConfig()),
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
