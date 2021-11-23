import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Image from "./Image";
import Product from "./Product";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: ["update"],
  })
  @JoinColumn({ name: "user_id" })
  products: Product[];
}
