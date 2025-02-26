import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Customer from './entities/customer.entity';
import { JwtService } from '@nestjs/jwt';
import Purchase from 'src/purchase/entities/purchase.entity';
import { PurchaseService } from 'src/purchase/purchase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Purchase])],
  controllers: [CustomerController],
  providers: [CustomerService, JwtService],
})
export class CustomerModule {}
