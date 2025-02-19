import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Purchase from './entities/purchase.entity';
import { CustomerService } from 'src/customer/customer.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import Customer from 'src/customer/entities/customer.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Customer, Vehicle])],
  controllers: [PurchaseController],
  providers: [PurchaseService, CustomerService, VehicleService],
})
export class PurchaseModule {}
