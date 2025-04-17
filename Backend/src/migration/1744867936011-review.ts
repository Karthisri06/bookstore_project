import { MigrationInterface, QueryRunner } from "typeorm";

export class Review1744867936011 implements MigrationInterface {
    name = 'Review1744867936011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_1337f93918c70837d3cea105d39\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_ae1ec2fd91f77b5df325d1c7b4a\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`bookId\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`book\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_534b9ccc62d81280da578de6fe6\` FOREIGN KEY (\`user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_f853f302822c42e41644e0279a4\` FOREIGN KEY (\`book\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_f853f302822c42e41644e0279a4\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP FOREIGN KEY \`FK_534b9ccc62d81280da578de6fe6\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`book\``);
        await queryRunner.query(`ALTER TABLE \`review\` DROP COLUMN \`user\``);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_ae1ec2fd91f77b5df325d1c7b4a\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`review\` ADD CONSTRAINT \`FK_1337f93918c70837d3cea105d39\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
