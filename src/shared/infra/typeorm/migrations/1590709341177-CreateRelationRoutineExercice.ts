import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRelationRoutineExercice1590709341177
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'routine_exercice',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // generate uuid automaticaly
          },
          {
            name: 'routine_id',
            type: 'uuid',
          },
          {
            name: 'exercice_id',
            type: 'uuid',
          },

          {
            name: 'sequence',
            type: 'int',
          },

          {
            name: 'repetitions',
            type: 'int',
          },

          {
            name: 'volume',
            type: 'int',
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
            name: 'Exercice',
            referencedTableName: 'exercices',
            referencedColumnNames: ['id'],
            columnNames: ['exercice_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Routine',
            referencedTableName: 'routines',
            referencedColumnNames: ['id'],
            columnNames: ['routine_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('routine_exercice');
  }
}
