import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
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
    update: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  checkIn: Date;

  @Column({
    nullable: true,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
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
