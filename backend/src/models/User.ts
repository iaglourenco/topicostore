import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Image from "./Image";
import Product from "./Product";
import bcrypt from "bcryptjs";
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: ["update"],
  })
  @JoinColumn({ name: "user_id" })
  products: Product[];
}
