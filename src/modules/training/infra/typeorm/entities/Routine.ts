import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Training from '@modules/training/infra/typeorm/entities/Training';

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

  @ManyToOne(type => Training, training => training.routines)
  @JoinColumn({ name: 'training_id', referencedColumnName: 'id' })
  training: Training;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Routine;
