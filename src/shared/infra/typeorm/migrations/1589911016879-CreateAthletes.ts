import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAthletes1589911016879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
          },

          {
            name: 'body_mass',
            type: 'float',
          },
          {
            name: 'stature',
            type: 'float',
          },
          {
            name: 'aerobic_profile',
            type: 'int',
          },
          {
            name: 'training_level',
            type: 'int',
          },
          {
            name: 'physical_activity',
            type: 'int',
          },
          {
            name: 'objective',
            type: 'int',
          },
          {
            name: 'basal_metabolic_rate',
            type: 'float',
          },
          {
            name: 'spent_daily_train',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'mass_muscle',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'mass_fat',
            type: 'float',
            isNullable: true,
          },

          {
            name: 'personal_profile',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'imc',
            type: 'float',
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
