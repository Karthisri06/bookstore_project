import { MigrationInterface, QueryRunner } from "typeorm";

export class Removegenrerelation1744777311400 implements MigrationInterface {
    name = 'Removegenrerelation1744777311400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_6ee57fcf22c96838179e5b46b2d\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`genreId\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`genre\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`authorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_66a4f0f47943a0d99c16ecf90b2\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_66a4f0f47943a0d99c16ecf90b2\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`authorId\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`genre\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`genreId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_6ee57fcf22c96838179e5b46b2d\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
