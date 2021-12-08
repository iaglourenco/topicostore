import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import BuyProductRecord from "./BuyProductRecord";
import Image from "./Image";
import Review from "./Review";
import User from "./User";

@Entity("products")
export default class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column()
  stock: number;

  @ManyToMany(
    () => BuyProductRecord,
    (buyProductRecord) => buyProductRecord.product
  )
  history: BuyProductRecord[];

  @OneToMany(() => Review, (review) => review.product, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "product_id" })
  reviews: Review[];

  @OneToMany(() => Image, (image) => image.product, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "product_id" })
  images: Image[];

  @ManyToOne(() => User, (user) => user.products, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
