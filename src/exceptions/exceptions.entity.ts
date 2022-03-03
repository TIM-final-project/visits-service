import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExceptionEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({
    nullable: false
})
visitId: number;

@Column({
    nullable: false
})
managerId: number;

@Column()
observations: string;

@CreateDateColumn()
created_at: Date;

}
  