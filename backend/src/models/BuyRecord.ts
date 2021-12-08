import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import BuyProductRecord from "./BuyProductRecord";
import User from "./User";

@Entity("buy_history")
export default class BuyRecord {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  data: string;

  @Column()
  total: number;

  @Column()
  status: string;

  @Column()
  enviado: boolean;

  @OneToMany(
    () => BuyProductRecord,
    (buyProductRecord) => buyProductRecord.record
  )
  @JoinColumn({ name: "id" })
  products: BuyProductRecord[];

  @ManyToOne(() => User, (product) => product.history)
  @JoinColumn({ name: "user_id" })
  user: User;
}
