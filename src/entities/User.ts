import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './Review';

interface UserOptions {
  userId?: number;
  username?: string;
  password?: string;
  token?: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @OneToMany(() => Review, (review) => review.reviewer, { cascade: true })
  reviews: Review[];

  constructor(options?: UserOptions) {
    this.userId = options?.userId ?? this.userId;
    this.username = options?.username ?? this.username;
    this.password = options?.password ?? this.password;
    this.token = options?.token ?? this.token;
  }
}
