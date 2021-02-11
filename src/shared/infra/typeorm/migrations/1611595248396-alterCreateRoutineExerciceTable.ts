import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterCreateRoutineExerciceTable1611595248396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('routine_exercice', 'sequence',
            new TableColumn({
                name: 'sequence',
                type: 'int',
                isNullable: true
            }));
        await queryRunner.changeColumn('routine_exercice', 'repetitions',
            new TableColumn({
                name: 'repetitions',
                type: 'int',
                isNullable: true
            }))
        await queryRunner.changeColumn('routine_exercice', 'volume',
            new TableColumn({
                name: 'volume',
                type: 'int',
                isNullable: true
            }))
        await queryRunner.changeColumn('routine_exercice', 'sort',
            new TableColumn({
                name: 'sort',
                type: 'int',
                isNullable: true
            }))


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "routine_exercice" ALTER COLUMN "sequence" NOT NULL',
        );
        await queryRunner.query(
            'ALTER TABLE "routine_exercice" ALTER COLUMN "repetitions" NOT NULL',
        );
        await queryRunner.query(
            'ALTER TABLE "routine_exercice" ALTER COLUMN "volume" NOT NULL',
        );
        await queryRunner.query(
            'ALTER TABLE "routine_exercice" ALTER COLUMN "sort" NOT NULL',
        );

    }

}
