import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './auth/google.strategy';
dotenv.config();

@Module({
  imports: [AuthModule, MongooseModule.forRoot(process.env.mongodb)],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
