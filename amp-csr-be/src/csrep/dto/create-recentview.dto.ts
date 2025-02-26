import Customer from 'src/customer/entities/customer.entity';
import Purchase from 'src/purchase/entities/purchase.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';
import { RecentlyViewed } from '../entities/csrep.entity';

export type CreateEditRecentView = (
  | Purchase
  | Customer
  | Vehicle
  | RecentlyViewed
) & {
  timeViewed: Date;
  recordType: string;
  customerId: string;
};
