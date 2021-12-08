import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import BuyRecord from "./BuyRecord";
import Product from "./Product";

@Entity("buy_products")
export default class BuyProductRecord {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => BuyRecord, (record) => record.products)
  @JoinColumn({ name: "history_id" })
  record: BuyRecord;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product[];

  @Column()
  amount: number;
}
