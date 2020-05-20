import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
          {
            name: 'sexo',
            type: 'bool',
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
          },
          {
            name: 'mass_muscle',
            type: 'float',
          },
          {
            name: 'mass_fat',
            type: 'float',
          },

          {
            name: 'personal_profile',
            type: 'int',
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
      }),
    );

    await queryRunner.createForeignKey(
      'athletes',
      new TableForeignKey({
        name: 'TrainerFK',
        columnNames: ['trainer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trainers', 'TrainerFK');
    await queryRunner.dropTable('athletes');
  }
}
