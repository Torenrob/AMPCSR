import { blob } from 'stream/consumers';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RecordType {
  CUST = 'Customer',
  VEH = 'Vehicle',
  PUR = 'Purchase',
}

export type RecentlyViewed = {
  id: string;
  recordType: RecordType;
  recordDetail: string;
  timeViewed: Date;
  customerId: string;
};

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

  @Column({
    type: 'text',
    default: '[]',
    transformer: {
      to: (v: RecentlyViewed) => JSON.stringify(v),
      from: (v: string) => {
        if (typeof v === 'string') return JSON.parse(v);
        if (typeof v === 'object') return v;
      },
    },
    nullable: false,
  })
  recentlyViewed: RecentlyViewed[];
}
