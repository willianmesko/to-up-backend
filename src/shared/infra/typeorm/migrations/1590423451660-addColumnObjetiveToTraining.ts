import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addColumnObjetiveToTraining1590423451660
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'training',
      new TableColumn({
        name: 'objective',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('training', 'objective');
  }
}
