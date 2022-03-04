import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from './Review';
import { User } from './User';

interface RestaurantOptions {
  restaurantId?: number;
  name?: string;
  description?: string;
  address?: string;
  imgUrl?: string;

  owner?: User;
  ownerId?: number;
}

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

  constructor(options?: RestaurantOptions) {
    this.restaurantId = options?.restaurantId ?? this.restaurantId;
    this.name = options?.name ?? this.name;
    this.description = options?.description ?? this.description;
    this.address = options?.address ?? this.address;
    this.imgUrl = options?.imgUrl ?? this.imgUrl;

    if (options?.owner) {
      this.owner = options.owner;
    } else if (options?.ownerId) {
      this.owner = new User({ userId: options.ownerId });
    }
  }
}
