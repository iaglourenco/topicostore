import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1637634701844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "brand",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "stock",
            type: "integer",
            isNullable: true,
          },
          {
            name: "rating",
            type: "decimal",
            isNullable: true,
          },
          {
            name: "reviews",
            type: "integer",
            isNullable: true,
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "ProductUser",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
