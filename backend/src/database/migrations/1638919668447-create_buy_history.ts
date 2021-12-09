import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBuyHistory1638919668447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "buy_history",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "data",
            type: "timestamp",
          },
          {
            name: "total",
            type: "decimal",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "enviado",
            type: "boolean",
          },
          {
            name: "user_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
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
    await queryRunner.dropTable("buy_history");
  }
}
