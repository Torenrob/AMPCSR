import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Csrep {
  @PrimaryGeneratedColumn('uuid')
  employeeId: string;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text', unique: true })
  user_name: string;

  @Column({ type: 'text' })
  password: string;
}
