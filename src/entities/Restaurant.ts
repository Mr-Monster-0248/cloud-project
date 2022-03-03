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
import { NewRestaurantDTO } from '../dto/restaurant.dto';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn({ name: 'restaurant_id' })
  restaurantId: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Review, (review) => review.restaurant, { cascade: true })
  reviews: Review[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  imgUrl: string;

  constructor(restaurant?: Partial<NewRestaurantDTO>, owner?: User) {
    this.name = restaurant?.name ?? this.name;
    this.description = restaurant?.description ?? this.description;
    this.address = restaurant?.address ?? this.address;
    this.imgUrl = restaurant?.imgUrl ?? this.imgUrl;
    this.owner = owner ?? this.owner;
  }
}
