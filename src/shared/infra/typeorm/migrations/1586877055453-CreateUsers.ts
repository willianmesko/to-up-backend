import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUsers1586877055453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // generate uuid automaticaly
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'surname',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'bio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cover',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'skills',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'instagram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_public',
            type: 'boolean',
            default: true,
          },
          {
            name: 'mensal_value',
            type: 'number',
            isNullable: true,
          },

          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'is_trainer',
            type: 'bool',
            default: true,
          },
          {
            name: 'sexo',
            type: 'int',
            default: 0,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
