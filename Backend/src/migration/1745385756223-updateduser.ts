import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateduser1745385756223 implements MigrationInterface {
    name = 'Updateduser1745385756223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_66a4f0f47943a0d99c16ecf90b2\` ON \`book\``);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authorId\` \`authorName\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`authorName\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`authorName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book\` DROP COLUMN \`authorName\``);
        await queryRunner.query(`ALTER TABLE \`book\` ADD \`authorName\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book\` CHANGE \`authorName\` \`authorId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_66a4f0f47943a0d99c16ecf90b2\` ON \`book\` (\`authorId\`)`);
    }

}
