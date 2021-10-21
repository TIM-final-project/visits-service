import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

Entity();
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  vehicleId: number;

  @Column({
    nullable: false,
  })
  driverId: number;

  @Column({
    nullable: false,
  })
  securityId: number;

  @Column({
    nullable: false,
    type: 'timestamptz'
  })
  checkIn: Date;

  @Column({
    nullable: true,
    type: 'timestamptz'
  })
  checkOut?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    nullable: false,
    default: true,
  })
  active: boolean;
}
