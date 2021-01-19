import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Routine from '@modules/training/infra/typeorm/entities/Routine';
import Exercice from '@modules/training/infra/typeorm/entities/Exercice';

@Entity('routine_exercice')
class RoutineExercice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  routine_id: string;

  @Column()
  exercice_id: string;

  @Column()
  exercice_name: string;

  @Column()
  sequence: number;

  @Column()
  repetitions: number;

  @Column()
  volume: number;

  @Column()
  observation: string;

  @Column()
  sort: number;

  @ManyToOne(type => Routine, routine => routine.routineExercice)
  @JoinColumn({ name: 'routine_id', referencedColumnName: 'id' })
  routine?: Routine;

  @ManyToOne(type => Exercice, exercice => exercice.routineExercice)
  @JoinColumn({ name: 'exercice_id', referencedColumnName: 'id' })
  exercice?: Exercice;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RoutineExercice;
