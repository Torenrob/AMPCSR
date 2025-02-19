import Customer from 'src/customer/entities/customer.entity';
import Purchase from 'src/purchase/entities/purchase.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  make: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'varchar' })
  year: string;

  @Column({ type: 'boolean' })
  isSubscribed: boolean;

  @Column({ type: 'datetime' })
  subscriptionStart: Date;

  @Column({ type: 'datetime' })
  subscriptionEnd: Date;

  @ManyToOne(() => Customer, (Customer) => Customer.vehicles)
  customer: Customer;

  @OneToMany(() => Purchase, (Purchase) => Purchase.vehicle)
  purchases: Purchase[];
}
