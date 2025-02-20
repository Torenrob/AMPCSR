import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { CsrepModule } from 'src/csrep/csrep.module';
import { AppService } from 'src/app.service';
import { CsrepService } from 'src/csrep/csrep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Csrep from 'src/csrep/entities/csrep.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Csrep]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          global: true,
          secret: secret,
          signOptions: { expiresIn: '300s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppService, CsrepService],
})
export class AuthModule {}
