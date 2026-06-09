import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('sign-in/email')
  emailSignIn() {
    return this.authService.emailSignIn();
  }

  @Post('sign-in/username')
  usernameSignIn() {
    return this.authService.usernameSignIn();
  }

  @Post('sign-out')
  signOut() {
    return this.authService.signOut();
  }
}
