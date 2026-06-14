import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home() {
    return {
      message: 'AttendEase is running!',
    };
  }

  getHealth() {
    return {
      message: 'Server healthy!',
    };
  }
}
