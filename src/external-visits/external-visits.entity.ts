import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export default class ExternalVisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  surname: string;

  @Column({
    nullable: false
  })
  cuit: string;

  @Column({
    nullable: false
  })
  scheduledDate: Date;

  @Column({
    nullable: true
  })
  arrivalDate?: Date;

  @Column({
    nullable: true
  })
  exitDate?: Date;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  has_vehicle?: boolean;

  @Column({ nullable: true })
  checkin_form: boolean;

  @Column({
    nullable: true
  })
  vehiclePlate?: string;

  @Column({
    default: true
  })
  active: boolean;

  @Column({
    nullable: false
  })
  userUUID: string;

  @Column({
    nullable: true
  })
  tasks?: string;

  @Column({
    nullable: true
  })
  observations?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    default: false
  })
  isContractor?: boolean;

  @Column({
    nullable: false,
  })
  plant: number;
}
