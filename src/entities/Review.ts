import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Check,
} from 'typeorm';
import { User } from './User';
import { Restaurant } from './Restaurant';

@Entity()
@Check(`grade BETWEEN 0 AND 5`)
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  reviewId: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  reviewer: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, { onDelete: 'CASCADE' })
  restaurant: Restaurant;

  @Column({ nullable: true })
  content: string;

  @Column()
  grade: number;
}
