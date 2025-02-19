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

  @Column({ type: 'datetime', nullable: true })
  subscriptionStart: Date | null;

  @Column({ type: 'datetime', nullable: true })
  subscriptionEnd: Date | null;

  @ManyToOne(() => Customer, (Customer) => Customer.vehicles, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  customer: Customer;

  // @Column({
  //   type: 'text',
  //   default: '[]',
  //   transformer: {
  //     to: (value: Purchase[]) => JSON.stringify(value),
  //     from: (value: string) => JSON.parse(value),
  //   },
  // })
  @OneToMany(() => Purchase, (Purchase) => Purchase.vehicle)
  purchases: Purchase[];
}
