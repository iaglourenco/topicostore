import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1637593646398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Realiza as alterações no banco de dados
    //Criar tabela, criar novo comapo, deletar campo, etc

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
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
