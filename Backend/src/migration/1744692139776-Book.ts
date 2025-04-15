import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1744692139776 implements MigrationInterface {
    name = 'Book1744692139776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP FOREIGN KEY \`FK_6ee57fcf22c96838179e5b46b2d\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`genreId\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`imageUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`genre\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`genre\``);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`genreId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` ADD CONSTRAINT \`FK_6ee57fcf22c96838179e5b46b2d\` FOREIGN KEY (\`genreId\`) REFERENCES \`genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
