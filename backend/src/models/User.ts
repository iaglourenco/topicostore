import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "./Product";
import bcrypt from "bcryptjs";
import Review from "./Review";
import BuyRecord from "./BuyRecord";
@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

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

  @OneToMany(() => BuyRecord, (buyRecord) => buyRecord.user, {
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  buyRecords: BuyRecord[];

  @OneToMany(() => Review, (review) => review.user, {
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  reviews: Review[];

  @OneToMany(() => Product, (product) => product.user, {
    eager: true,
  })
  @JoinColumn({ name: "user_id" })
  products: Product[];
}
