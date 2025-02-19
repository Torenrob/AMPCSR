import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vehicle from './entities/vehicle.entity';
import Customer from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Customer])],
  controllers: [VehicleController],
  providers: [VehicleService, CustomerService],
})
export class VehicleModule {}
