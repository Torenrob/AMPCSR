import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Csrep {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;

    @Column({ type: 'varchar', length: 100 })
    first_name: string;

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    user_name: string;

    @Column({ type: 'varchar' })
    password: string;
}
