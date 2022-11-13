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

  @Column()
  arrivalDate?: Date;

  @Column()
  exitDate?: Date;

  @Column({
    nullable: true
  })
  vehiclePlate?: string;

  @Column({
    default: true
  })
  active: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
