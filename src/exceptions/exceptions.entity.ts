import { VisitEntity } from 'src/visits/visits.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class VisitExceptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => VisitEntity, (visit) => visit.exception)
  @JoinColumn()
  visit: VisitEntity;

  @Column({
    nullable: false
  })
  managerUuid: string;

  @Column()
  observations: string;

  @CreateDateColumn()
  created_at: Date;
}
