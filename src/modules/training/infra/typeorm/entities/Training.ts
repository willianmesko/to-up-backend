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

import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

import User from '@modules/users/infra/typeorm/entities/User';
import Routine from '@modules/training/infra/typeorm/entities/Routine';

@Entity('training')
class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  cover: string;

  @Column()
  difficulty: number;

  @Column()
  trainer_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'trainer_id', referencedColumnName: 'id' })
  trainer: User;

  @OneToMany(type => Routine, routine => routine.training)
  routines: Routine[];

  @Expose({ name: 'cover_url' })
  getAvatarUrl(): string | null {
    if (!this.cover) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cover}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.cover}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Training;
