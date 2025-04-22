import { MigrationInterface, QueryRunner } from "typeorm";

export class Purchasetable1745230624380 implements MigrationInterface {
    name = 'Purchasetable1745230624380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`purchase\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`totalPrice\` decimal(10,2) NOT NULL, \`purchasedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_33520b6c46e1b3971c0a649d38b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_a4765c82e4faf4270abceb21fc6\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_a4765c82e4faf4270abceb21fc6\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_33520b6c46e1b3971c0a649d38b\``);
        await queryRunner.query(`DROP TABLE \`purchase\``);
    }

}
