import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  register() {
    return {
      message: 'User registered!',
    };
  }

  emailSignIn() {
    return {
      message: 'User signed in with email!',
    };
  }

  usernameSignIn() {
    return {
      message: 'User signed in with username!',
    };
  }

  signOut() {
    return {
      message: 'User signed out!',
    };
  }
}
