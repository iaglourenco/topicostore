import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "./Product";
import User from "./User";

@Entity("reviews")
export default class Review {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  stars: number;

  @Column()
  opinion: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: "product_id" })
  product: Product;
}
