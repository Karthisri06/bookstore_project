import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1744725872845 implements MigrationInterface {
    name = 'Book1744725872845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`thumbnail\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`thumbnail\` varchar(255) NOT NULL`);
    }

}
