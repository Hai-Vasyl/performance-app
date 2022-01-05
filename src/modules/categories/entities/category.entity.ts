import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Todo } from '@/modules/todos/todo.entity';
import { User } from '@/modules/users/entities/user.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => Todo, (todo) => todo.categories)
  todo: Todo;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
