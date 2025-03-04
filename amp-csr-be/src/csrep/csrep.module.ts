import { Module } from '@nestjs/common';
import { CsrepService } from './csrep.service';
import { CsrepController } from './csrep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Csrep from './entities/csrep.entity';
import { AppService } from 'src/app.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Csrep])],
  controllers: [CsrepController],
  providers: [CsrepService, AppService, JwtService],
})
export class CsrepModule {}
