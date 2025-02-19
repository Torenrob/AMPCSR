import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getBcryptSecretKey(): string {
    const pass: string | undefined =
      this.config.get<string>('BCRYPT_SECRETKEY');
    if (!pass) {
      throw new Error('Bcrypt Secret Key environment variable not present');
    }
    return pass;
  }
}
