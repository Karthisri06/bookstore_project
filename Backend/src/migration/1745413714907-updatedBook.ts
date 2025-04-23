import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBook1745413714907 implements MigrationInterface {
    name = 'UpdatedBook1745413714907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authorName\` \`author\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`author\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`author\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`author\` \`authorName\` varchar(255) NOT NULL`);
    }

}
