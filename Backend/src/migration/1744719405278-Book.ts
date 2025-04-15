import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1744719405278 implements MigrationInterface {
    name = 'Book1744719405278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`testColumn\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`testColumn\``);
    }

}
