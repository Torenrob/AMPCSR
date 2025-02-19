import { PartialType } from '@nestjs/mapped-types';
import Vehicle from '../entities/vehicle.entity';

export default class CreateEditVehicleDto extends PartialType(Vehicle) {
  customerId: string;
}
