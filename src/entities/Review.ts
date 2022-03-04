import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Check,
} from 'typeorm';
import { User } from './User';
import { Restaurant } from './Restaurant';
import { NewReviewDTO } from '../dto/review.dto';

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

  constructor(review?: Partial<NewReviewDTO>, reviewer?: User, restaurant?: Restaurant) {
    this.content = review?.content ?? this.content;
    this.grade = review?.grade ?? this.grade;
    this.reviewer = reviewer ?? this.reviewer;
    this.restaurant = restaurant ?? this.restaurant;
  }
}
