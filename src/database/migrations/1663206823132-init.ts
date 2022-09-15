import { MigrationInterface, QueryRunner } from "typeorm";

export class init1663206823132 implements MigrationInterface {
    name = 'init1663206823132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" character varying NOT NULL, "platform" character varying NOT NULL, "currency" character varying NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "amount" double precision NOT NULL, "currency_rate" double precision NOT NULL DEFAULT '1', "acount_id" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_unit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_51c0a48b3055d7091c072a1521f" UNIQUE ("name"), CONSTRAINT "PK_38a12a76044eb4b261541c52b66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_3906cb061b122c41de5349c7935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "client_name" character varying NOT NULL, "is_finished" boolean NOT NULL DEFAULT false, "work_type_id" integer, CONSTRAINT "UQ_19280e023a233a1a6abe15b69c9" UNIQUE ("description"), CONSTRAINT "PK_1ad2a9dfd058d66c37e6d495222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19280e023a233a1a6abe15b69c" ON "work" ("description") `);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "quantity" double precision NOT NULL, "unit_price" double precision NOT NULL, "budget_unit_id" integer, "work_id" integer, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_expense" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "provider" character varying NOT NULL, "price" double precision NOT NULL, "is_paid" boolean NOT NULL DEFAULT false, "budget_id" integer, CONSTRAINT "PK_921dae7d4280277fe4c379e80ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_currency" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_d4a19e7dc60ccc27442fda21eaf" UNIQUE ("name"), CONSTRAINT "PK_a686f2a046eb88d479b13b4658f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_expense_payments" ("expense_id" integer NOT NULL, "payment_id" integer NOT NULL, CONSTRAINT "PK_c544b531b5220912af5810bde71" PRIMARY KEY ("expense_id", "payment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9722cde5d73e4f90a3c4f72fa6" ON "budget_expense_payments" ("expense_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_94a4d5acf4bee330b4c76c2462" ON "budget_expense_payments" ("payment_id") `);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_8e1890bb6d50b179732bfa38b4e" FOREIGN KEY ("acount_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work" ADD CONSTRAINT "FK_24db868b7d06d7377e386109b6b" FOREIGN KEY ("work_type_id") REFERENCES "work_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d" FOREIGN KEY ("budget_unit_id") REFERENCES "budget_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_7d9728abfe94844542d994727e8" FOREIGN KEY ("work_id") REFERENCES "work"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_expense" ADD CONSTRAINT "FK_9028f32784b332e818bf03056da" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" ADD CONSTRAINT "FK_9722cde5d73e4f90a3c4f72fa63" FOREIGN KEY ("expense_id") REFERENCES "budget_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" ADD CONSTRAINT "FK_94a4d5acf4bee330b4c76c24629" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" DROP CONSTRAINT "FK_94a4d5acf4bee330b4c76c24629"`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" DROP CONSTRAINT "FK_9722cde5d73e4f90a3c4f72fa63"`);
        await queryRunner.query(`ALTER TABLE "budget_expense" DROP CONSTRAINT "FK_9028f32784b332e818bf03056da"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_7d9728abfe94844542d994727e8"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d"`);
        await queryRunner.query(`ALTER TABLE "work" DROP CONSTRAINT "FK_24db868b7d06d7377e386109b6b"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_8e1890bb6d50b179732bfa38b4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94a4d5acf4bee330b4c76c2462"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9722cde5d73e4f90a3c4f72fa6"`);
        await queryRunner.query(`DROP TABLE "budget_expense_payments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "account_currency"`);
        await queryRunner.query(`DROP TABLE "budget_expense"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19280e023a233a1a6abe15b69c"`);
        await queryRunner.query(`DROP TABLE "work"`);
        await queryRunner.query(`DROP TABLE "work_type"`);
        await queryRunner.query(`DROP TABLE "budget_unit"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
