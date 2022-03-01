import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Review } from './Review';
import { User } from './User';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'restaurant_id' })
  restaurantId: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  imgUrl: string;
}
