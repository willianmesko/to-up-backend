import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addDurationAndVolumeColumnToRotine1590423934800
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'routines',
      new TableColumn({
        name: 'duration',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'routines',
      new TableColumn({
        name: 'volume',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'routines',
      new TableColumn({
        name: 'caloric_expenditure',
        type: 'float',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'routines',
      new TableColumn({
        name: 'intensity',
        type: 'float',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('routines', 'intensity');
    await queryRunner.dropColumn('routines', 'caloric_expenditure');
    await queryRunner.dropColumn('routines', 'volume');
    await queryRunner.dropColumn('routines', 'duration');
  }
}
