import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn
} from 'typeorm';
@Entity()
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  vehicleId: number;

  @Column({
    nullable: false
  })
  driverId: number;

  @Column({
    nullable: false
  })
  securityId: number;

  @Column({
    nullable: false,
    update: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp'
  })
  checkIn: Timestamp;

  @Column({
    nullable: true,
    type: 'timestamp'
  })
  checkOut?: Timestamp;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    nullable: false,
    default: true
  })
  active: boolean;
}
