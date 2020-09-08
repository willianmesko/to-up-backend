import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import Training from '@modules/training/infra/typeorm/entities/Training';

import { FirstLatter } from '@decorators';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @FirstLatter()
  name: string;

  @Column()
  @FirstLatter()
  surname: string;

  @Column()
  email: string;

  @Column()
  sexo: number;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(type => Athlete, athlete => athlete.trainer)
  athletes: Athlete[];

  @OneToMany(type => Training, training => training.trainer)
  trainings: Training[];

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

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
}

export default User;
