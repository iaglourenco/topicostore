import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBuyHistoryProductsProducts1639013593177
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "buy_history_products_products",
        columns: [
          {
            name: "buyHistoryId",
            type: "integer",
          },
          {
            name: "productsId",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["buyHistoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "buy_history",
          },
          {
            columnNames: ["productsId"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
