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
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('athletes')
class Athlete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  trainer_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'id' })
  trainer: User;

  @Column()
  sexo: boolean;

  @Column('int')
  age: number;

  @Column('float')
  body_mass: number;

  @Column('float')
  stature: number;

  @Column('int')
  aerobic_profile: number;

  @Column('int')
  training_level: number;

  @Column('int')
  physical_activity: number;

  @Column('int')
  objective: number;

  @Column('float')
  basal_metabolic_rate: number;

  @Column('float')
  spent_daily_train: number;

  @Column('float')
  mass_muscle: number;

  @Column('float')
  mass_fat: number;

  @Column('int')
  personal_profile: number;

  @Column('float')
  imc: number;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Athlete;
