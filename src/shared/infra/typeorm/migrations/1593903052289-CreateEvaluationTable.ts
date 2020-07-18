import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAssessmentTable1593903052289
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'evaluation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()', // generate uuid automaticaly
          },
          {
            name: 'type',
            type: 'int',
          },
          {
            name: 'type_title',
            type: 'varchar',
          },

          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'athlete_age',
            type: 'int',
          },
          {
            name: 'athlete_weight',
            type: 'float',
          },
          {
            name: 'athlete_sexo',
            type: 'int',
          },
          {
            name: 'athlete_ethnicity',
            type: 'int',
          },
          {
            name: 'athlete_height',
            type: 'int',
          },
          {
            name: 'subscapular',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'tricipital',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'breastplate',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'axilar',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'thigh',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'suprailiac',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'abdominal',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'chest',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'waist',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'abdomen',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'leg',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'hip',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'right_arm',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'left_arm',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'right_thigh',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'left_thigh',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'right_leg',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'left_leg',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'right_forearm',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'left_forearm',
            type: 'float',
            isNullable: true,
          },

          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'total_skin_folds',
            type: 'float',
          },
          {
            name: 'body_density',
            type: 'float',
          },
          {
            name: 'fat_weight',
            type: 'float',
          },
          {
            name: 'lean_body_mass',
            type: 'float',
          },
          {
            name: 'mass_muscle',
            type: 'float',
          },
          {
            name: 'body_muscle_percentage',
            type: 'float',
          },
          {
            name: 'body_fat_percentage',
            type: 'float',
          },
          {
            name: 'classification',
            type: 'varchar',
          },
          {
            name: 'desired_fat_percentage',
            type: 'float',
          },
          {
            name: 'ideal_body_weight',
            type: 'float',
          },

          {
            name: 'trainer_id',
            type: 'uuid',
          },
          {
            name: 'athlete_id',
            type: 'uuid',
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
            name: 'TrainerOwner',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['trainer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Athlete',
            referencedTableName: 'athletes',
            referencedColumnNames: ['id'],
            columnNames: ['athlete_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('evaluation');
  }
}
