import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

import Athlete from '@modules/athletes/infra/typeorm/entities/Athlete';
import Training from '@modules/training/infra/typeorm/entities/Training';
import UserAddress from './UserAddress';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  sexo: number;

  @Column()
  bio: string;

  @Column()
  is_public: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(type => UserAddress)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  address: UserAddress;

  @OneToMany(type => Athlete, athlete => athlete.trainer)
  athletes: Athlete[];

  @OneToMany(type => Training, training => training.trainer)
  trainings: Training[];

  @Column()
  avatar: string;

  @Column()
  cover: string;

  @Column()
  skills: string;

  @Column()
  instagram: string;

  @Column('float')
  mensal_value: number;

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

  @BeforeInsert()
  firstLetterUpperCase() {
    this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
    this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1);
  }
}

export default User;
