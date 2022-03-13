import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Restaurant } from './Restaurant';

interface ReviewOptions {
  reviewId?: number;
  content?: string;
  grade?: number;

  // link to other tables
  reviewer?: User;
  restaurant?: Restaurant;

  // as link can be entity with the foreign key
  reviewerId?: number;
  restaurantId?: number;
}

@Entity()
@Check(`grade BETWEEN 0 AND 5`)
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  reviewId: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  reviewer: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ nullable: true })
  content: string;

  @Column()
  grade: number;

  constructor(options?: ReviewOptions) {
    this.reviewId = options?.reviewId ?? this.reviewId;
    this.content = options?.content ?? this.content;
    this.grade = options?.grade ?? this.grade;

    if (options?.reviewer) {
      this.reviewer = options.reviewer;
    } else if (options?.reviewerId) {
      this.reviewer = new User({ userId: options.reviewerId });
    }

    if (options?.restaurant) {
      this.restaurant = options.restaurant;
    } else if (options?.restaurantId) {
      this.restaurant = new Restaurant({ restaurantId: options.restaurantId });
    }
  }
}
