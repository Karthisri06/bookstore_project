import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCart1745332010363 implements MigrationInterface {
    name = 'UpdatedCart1745332010363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_15605eba0be4c6669389090dd15\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`bookId\` \`bookName\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`bookName\` \`bookId\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_15605eba0be4c6669389090dd15\` ON \`cart\` (\`bookId\`)`);
    }

}
