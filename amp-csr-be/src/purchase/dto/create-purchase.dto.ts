import { PartialType } from '@nestjs/mapped-types';
import Purchase from '../entities/purchase.entity';

export default class CreateEditPurchaseDto extends PartialType(Purchase) {
  customerId: string;
  vehicleId: string;
}
