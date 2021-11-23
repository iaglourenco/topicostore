import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1637636825172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "product_id",
            type: "integer",
          },
          {
            name: "path",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "ProductImages",
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("images");
  }
}
