import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExerciceTable1590604969799
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exercices',
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
            name: 'muscle_group_id',
            type: 'int',
          },

          {
            name: 'muscle_group_name',
            type: 'varchar',
          },
          {
            name: 'youtube_video_id',
            type: 'varchar',
          },
          {
            name: 'trainer_id',
            type: 'uuid',
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
            name: 'TrainerOwnder',
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
    await queryRunner.dropTable('exercices');
  }
}
