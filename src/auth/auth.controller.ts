import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    return this.authService.register();
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
