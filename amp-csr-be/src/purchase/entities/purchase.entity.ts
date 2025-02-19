import Customer from 'src/customer/entities/customer.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PurchaseType {
  SUB = 'SUBSCRIPTION',
  SINGWASH = 'SINGLE_WASH',
  RFD = 'REFUND',
  OTH = 'OTHER',
}

@Entity()
export default class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date_time: Date;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'text', enum: PurchaseType })
  purchase_type: PurchaseType;

  @ManyToOne(() => Customer, (Customer) => Customer.purchases, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  customer: Customer;

  @ManyToOne(() => Vehicle, (Vehicle) => Vehicle.purchases, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  vehicle: Vehicle;
}
