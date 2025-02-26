import Purchase from 'src/purchase/entities/purchase.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  phone: string;

  @OneToMany(() => Vehicle, (Vehicle) => Vehicle.customer)
  vehicles: Vehicle[];

  @OneToMany(() => Purchase, (Purchase) => Purchase.customer)
  purchases: Purchase[];
}
