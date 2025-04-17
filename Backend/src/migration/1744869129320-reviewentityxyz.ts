import { MigrationInterface, QueryRunner } from "typeorm";

export class Reviewentityxyz1744869129320 implements MigrationInterface {
    name = 'Reviewentityxyz1744869129320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_ae1ec2fd91f77b5df325d1c7b4a\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`bookId\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`user\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`book\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`book\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`user\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_ae1ec2fd91f77b5df325d1c7b4a\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
