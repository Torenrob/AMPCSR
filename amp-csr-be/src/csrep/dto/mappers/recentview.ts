import { RecentlyViewed, RecordType } from 'src/csrep/entities/csrep.entity';
import { CreateEditRecentView } from '../create-recentview.dto';
import Purchase from 'src/purchase/entities/purchase.entity';
import Customer from 'src/customer/entities/customer.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';

export const mapRecentView = (
  crv: CreateEditRecentView & RecentlyViewed,
): RecentlyViewed => {
  if (crv.recordDetail) return crv;

  switch (crv.recordType.toLowerCase()) {
    case 'purchase':
      return purchaseToRecent(crv as CreateEditRecentView & Purchase);
    case 'customer':
      return customerToRecent(crv as CreateEditRecentView & Customer);
    case 'vehicle':
      return vehicleToRecent(crv as CreateEditRecentView & Vehicle);
    default:
      throw new Error('Recent View Object does not match accepted classes');
  }
};

function purchaseToRecent(
  pur: CreateEditRecentView & Purchase,
): RecentlyViewed {
  return {
    id: pur.id,
    recordType: RecordType.PUR,
    recordDetail: `Date: ${pur.date_time} - Type: ${pur.purchase_type} - Amount: ${pur.amount} - User: ${pur.customer}`,
    timeViewed: pur.timeViewed,
    customerId: pur.customerId,
  };
}

function customerToRecent(c: CreateEditRecentView & Customer): RecentlyViewed {
  return {
    id: c.id,
    recordType: RecordType.CUST,
    recordDetail: `${c.first_name} ${c.last_name} - Phone: ${c.phone} - Email: ${c.email}`,
    timeViewed: c.timeViewed,
    customerId: c.id,
  };
}

function vehicleToRecent(v: CreateEditRecentView & Vehicle): RecentlyViewed {
  return {
    id: v.id,
    recordType: RecordType.VEH,
    recordDetail: `${v.year} ${v.make} ${v.model} - Owner: ${v.customer}`,
    timeViewed: v.timeViewed,
    customerId: v.customerId,
  };
}

function checkForMatchingProperties(
  crv: CreateEditRecentView,
  classConstructor: Object,
): boolean {
  const classProps = Object.getOwnPropertyNames(classConstructor);
  const objectProperties = Object.keys(crv);

  return objectProperties.every((p) => {
    if (p === 'timeViewed') return true;
    return classProps.includes(p);
  });
}
