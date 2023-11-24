// auth.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req): Promise<any> {
    const { googleId, displayName, email } = req.user;
    const user = await this.authService.findOrCreateUser(
      googleId,
      displayName,
      email,
    );
    const token = await this.authService.generateJwtToken(user);

    return {
      access_token: token,
      user,
    };
  }
}
