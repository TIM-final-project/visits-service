import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
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
    nullable: true
  })
  userUUID: string;

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

  @Column({ nullable: false, type: 'timestamp' })
  arrival_at: Date;

  @Column({
    nullable: true
  })
  palletsEntrada?: number;

  @Column({
    nullable: true
  })
  palletsSalida?: number;

  @Column({
    nullable: true
  })
  destiny?: string;

  @Column({
    nullable: false,
    default: true
  })
  active: boolean;

  @Column({
    nullable: true
  })
  hasSupply?: boolean;

  @Column({
    nullable: false
  })
  plant: number;
}
