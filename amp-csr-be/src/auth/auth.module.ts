import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import AuthService from './auth.service';
import { CsrepModule } from 'src/csrep/csrep.module';
import { AppService } from 'src/app.service';
import { CsrepService } from 'src/csrep/csrep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Csrep from 'src/csrep/entities/csrep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Csrep])],
  controllers: [AuthController],
  providers: [AuthService, AppService, CsrepService],
})
export class AuthModule {}
