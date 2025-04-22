import { MigrationInterface, QueryRunner } from "typeorm";

export class Removedummyfield1745312526992 implements MigrationInterface {
    name = 'Removedummyfield1745312526992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`test\` int NOT NULL`);
    }

}
