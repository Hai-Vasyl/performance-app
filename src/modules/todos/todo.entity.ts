import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '@/modules/categories/entities/category.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('todos')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'enum', default: 0, enum: [0, 1, 2] })
  importance: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Category, (category) => category.todo)
  categories: Category[];

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
