import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1744725677770 implements MigrationInterface {
    name = 'Book1744725677770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
