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

  @Column({
    nullable: true
  })
  vehiclePlate?: string;

  @Column({
    default: true
  })
  active: boolean;

  @Column()
  managerUuid: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
