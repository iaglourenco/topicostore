import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "./Product";
import User from "./User";

@Entity("buy_history")
export default class BuyRecord {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  data: number;

  @Column()
  total: number;

  @Column()
  status: string;

  @Column()
  enviado: boolean;

  @ManyToOne(() => User, (user) => user.buyRecords, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Product, {
    cascade: true,
  })
  @JoinTable()
  products: Product[];
}
