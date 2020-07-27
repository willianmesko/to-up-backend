import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAthletes1589911016879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'athletes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // generate uuid automaticaly
          },
          {
            name: 'trainer_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'ethnicity',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'aerobic_profile',
            type: 'float',
            isNullable: true,
          },

          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          { name: 'avatar', type: 'varchar', isNullable: true },
          {
            name: 'sexo',
            type: 'int',
            default: 0,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'body_mass',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'stature',
            type: 'float',
            isNullable: true,
          },

          {
            name: 'training_level',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'physical_activity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'objective',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'personal_profile',
            type: 'int',
            isNullable: true,
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
        foreignKeys: [
          {
            name: 'AthletesTrainer',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['trainer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('athletes');
  }
}
