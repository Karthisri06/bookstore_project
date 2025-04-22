import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCart1745312391902 implements MigrationInterface {
    name = 'AddCart1745312391902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`test\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`test\``);
    }

}
