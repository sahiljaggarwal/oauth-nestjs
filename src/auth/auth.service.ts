// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOrCreateUser(
    googleId: string,
    displayName: string,
    email: string,
  ): Promise<User> {
    let user = await this.userModel.findOne({ googleId });

    if (!user) {
      user = await this.userModel.create({ googleId, displayName, email });
    }

    return user;
  }

  async generateJwtToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: process.env.secretKey,
      expiresIn: '1d',
    });
  }
}
