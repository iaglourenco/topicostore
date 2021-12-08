import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBuyProducts1638919729864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "buy_products",
        columns: [
          {
            name: "id",
            type: "integer",
            isGenerated: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "history_id",
            type: "integer",
          },
          {
            name: "product_id",
            type: "integer",
          },
          {
            name: "amount",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ProductBuy",
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "BuyRecord",
            columnNames: ["history_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "buy_history",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
