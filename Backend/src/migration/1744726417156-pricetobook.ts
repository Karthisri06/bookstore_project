import { MigrationInterface, QueryRunner } from "typeorm";

export class Pricetobook1744726417156 implements MigrationInterface {
    name = 'Pricetobook1744726417156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`testColumn\` \`price\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`price\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`price\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`price\` \`testColumn\` varchar(255) NULL`);
    }

}
