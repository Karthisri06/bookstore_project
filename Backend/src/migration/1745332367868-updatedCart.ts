import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1745332367868 implements MigrationInterface {
    name = 'UpdatedCart1745332367868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`bookName\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`bookName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`bookName\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`bookName\` int NOT NULL`);
    }

}
