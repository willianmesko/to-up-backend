import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

import RoutineExercice from '@modules/training/infra/typeorm/entities/RoutineExercice';

@Entity('exercices')
class Exercice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  muscle_group_id: number;

  @Column()
  muscle_group_name: string;

  @Column()
  youtube_video_id: string;

  @Column()
  trainer_id: string;

  @Column()
  duration: number;

  @Column()
  calorie: number;

  @OneToMany(
    type => RoutineExercice,
    routineExercice => routineExercice.exercice,
  )
  routineExercice!: RoutineExercice[];

  @BeforeInsert()
  firstLetterUpperCase() {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exercice;
