import { MigrationInterface, QueryRunner } from "typeorm";

export class init1662564191162 implements MigrationInterface {
    name = 'init1662564191162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_3906cb061b122c41de5349c7935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "client_name" character varying NOT NULL, "is_finished" boolean NOT NULL DEFAULT false, "work_type_id" integer, CONSTRAINT "PK_1ad2a9dfd058d66c37e6d495222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_unit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_38a12a76044eb4b261541c52b66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "quantity" numeric NOT NULL, "unitPrice" numeric NOT NULL, "work_id" integer, "budget_unit_id" integer, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "display_name" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work" ADD CONSTRAINT "FK_24db868b7d06d7377e386109b6b" FOREIGN KEY ("work_type_id") REFERENCES "work_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_7d9728abfe94844542d994727e8" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d" FOREIGN KEY ("budget_unit_id") REFERENCES "budget_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_7d9728abfe94844542d994727e8"`);
        await queryRunner.query(`ALTER TABLE "work" DROP CONSTRAINT "FK_24db868b7d06d7377e386109b6b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "budget_unit"`);
        await queryRunner.query(`DROP TABLE "work"`);
        await queryRunner.query(`DROP TABLE "work_type"`);
    }

}
