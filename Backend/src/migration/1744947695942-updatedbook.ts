import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedbook1744947695942 implements MigrationInterface {
    name = 'Updatedbook1744947695942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authors\` \`authors\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authors\` \`authors\` varchar(255) NOT NULL`);
    }

}
