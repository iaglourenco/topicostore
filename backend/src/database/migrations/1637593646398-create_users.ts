import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1637593646398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Realiza as alterações no banco de dados
    //Criar tabela, criar novo campo, deletar campo, etc

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "first_name",
            type: "varchar",
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Desfaz as alterações no banco de dados
    //Desfazer o que foi feito no método up
    await queryRunner.dropTable("users");
  }
}
