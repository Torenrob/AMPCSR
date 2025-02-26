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

  @Column({ type: 'text' })
  make: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'text' })
  year: string;

  @Column({ type: 'boolean', default: false })
  isSubscribed: boolean;

  @ManyToOne(() => Customer, (Customer) => Customer.vehicles, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  customer: Customer;

  @OneToMany(() => Purchase, (Purchase) => Purchase.vehicle)
  purchases: Purchase[];
}
