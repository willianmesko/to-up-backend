import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import Training from '@modules/training/infra/typeorm/entities/Training';
import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

@Entity('routines')
class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  training_id: string;

  @Column('int')
  volume: number;

  @Column('float')
  duration: number;

  @Column('float')
  caloric_expenditure: number;

  @Column('float')
  intensity: number;

  @OneToMany(
    type => RoutineExercice,
    routineExercice => routineExercice.routine,
  )
  routineExercice!: RoutineExercice[];

  @ManyToOne(type => Training, training => training.routines)
  @JoinColumn({ name: 'training_id', referencedColumnName: 'id' })
  training: Training;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Routine;
