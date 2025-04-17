import { MigrationInterface, QueryRunner } from "typeorm";

export class Changedreview1744870443626 implements MigrationInterface {
    name = 'Changedreview1744870443626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`content\` \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`comment\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`comment\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`comment\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` CHANGE \`comment\` \`content\` varchar(255) NOT NULL`);
    }

}
