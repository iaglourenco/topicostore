import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createReviews1638919654700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reviews",
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
            name: "user_id",
            type: "uuid",
          },
          {
            name: "stars",
            type: "integer",
          },
          {
            name: "opinion",
            type: "varchar",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
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
    await queryRunner.dropTable("reviews");
  }
}
