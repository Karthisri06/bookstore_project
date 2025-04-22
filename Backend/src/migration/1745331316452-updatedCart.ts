import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1745331316452 implements MigrationInterface {
    name = 'UpdatedCart1745331316452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_15605eba0be4c6669389090dd15\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`addedAt\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`bookId\` \`bookId\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`bookId\` \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userName\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`addedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_15605eba0be4c6669389090dd15\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
