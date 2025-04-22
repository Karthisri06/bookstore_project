import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUser1745334120232 implements MigrationInterface {
    name = 'UpdatedUser1745334120232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`userName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`userName\``);
    }

}
