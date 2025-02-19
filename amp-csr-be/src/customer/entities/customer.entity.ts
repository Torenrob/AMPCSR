import Purchase from 'src/purchase/entities/purchase.entity';
import Vehicle from 'src/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export default class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100 })
    first_name: string;

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    phone: string;

    @Column({ type: 'varchar', length: 300 })
    address: string;

    @OneToMany(() => Vehicle, (Vehicle) => Vehicle.customer)
    vehicles: Vehicle[];

    @OneToMany(() => Purchase, (Purchase) => Purchase.customer)
    purchases: Purchase[];
}
