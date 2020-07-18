import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';

@Entity('evaluation')
class Evaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: number;

  @Column()
  type_title: string;

  @Column()
  date: Date;

  @Column('int')
  athlete_age: number;

  @Column('float')
  athlete_weight: number;

  @Column()
  athlete_sexo: number;

  @Column()
  athlete_ethnicity: number;

  @Column('float')
  athlete_height: number;

  @Column('float')
  subscapular: number;

  @Column('float')
  tricipital: number;

  @Column('float')
  breastplate: number;

  @Column('float')
  axilar: number;

  @Column('float')
  thigh: number;

  @Column('float')
  suprailiac: number;

  @Column('float')
  abdominal: number;

  @Column('float')
  chest: number;

  @Column('float')
  waist: number;

  @Column('float')
  leg: number;

  @Column('float')
  hip: number;

  @Column('float')
  right_arm: number;

  @Column('float')
  left_arm: number;

  @Column('float')
  abdomen: number;

  @Column('float')
  right_thigh: number;

  @Column('float')
  left_thigh: number;

  @Column('float')
  right_leg: number;

  @Column('float')
  left_leg: number;

  @Column('float')
  right_forearm: number;

  @Column('float')
  left_forearm: number;

  @Column('float')
  total_skin_folds: number;

  @Column('float')
  body_density: number;

  @Column('float')
  fat_weight: number;

  @Column('float')
  lean_body_mass: number;

  @Column('float')
  mass_muscle: number;

  @Column('float')
  body_muscle_percentage: number;

  @Column('float')
  body_fat_percentage: number;

  @Column()
  classification: string;

  @Column('float')
  desired_fat_percentage: number;

  @Column('float')
  ideal_body_weight: number;

  @Column()
  observation: string;

  @Column()
  athlete_id: string;

  @ManyToOne(type => Athlete, athlete => athlete.evaluation)
  @JoinColumn({ name: 'athlete_id', referencedColumnName: 'id' })
  athletes: Athlete[];

  @Column()
  trainer_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Evaluation;
