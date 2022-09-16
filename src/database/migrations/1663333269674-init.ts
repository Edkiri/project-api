import { MigrationInterface, QueryRunner } from "typeorm";

export class init1663333269674 implements MigrationInterface {
    name = 'init1663333269674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "budget_unit" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_51c0a48b3055d7091c072a1521f" UNIQUE ("name"), CONSTRAINT "PK_38a12a76044eb4b261541c52b66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_2a06e25261f5e8eb431d3683931" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account_currency" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_d4a19e7dc60ccc27442fda21eaf" UNIQUE ("name"), CONSTRAINT "PK_a686f2a046eb88d479b13b4658f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner" character varying NOT NULL, "platform" character varying NOT NULL, "balance" double precision NOT NULL, "currency_id" integer, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "amount" double precision NOT NULL, "currency_rate" double precision NOT NULL DEFAULT '1', "currency_id" integer, "acount_id" integer, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_income" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_f9e291ad319dee0861886d058b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "client_name" character varying NOT NULL, "is_finished" boolean NOT NULL DEFAULT false, "project_type_id" integer, CONSTRAINT "UQ_d04865be9fcf7a194226b74b91d" UNIQUE ("description"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d04865be9fcf7a194226b74b91" ON "project" ("description") `);
        await queryRunner.query(`CREATE TABLE "budget_expense" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "provider" character varying NOT NULL, "price" double precision NOT NULL, "is_paid" boolean NOT NULL DEFAULT false, "budget_id" integer, CONSTRAINT "PK_921dae7d4280277fe4c379e80ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "quantity" double precision NOT NULL, "unit_price" double precision NOT NULL, "project_id" integer, "budget_unit_id" integer, CONSTRAINT "PK_9af87bcfd2de21bd9630dddaa0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "budget_income_payments" ("income_id" integer NOT NULL, "payment_id" integer NOT NULL, CONSTRAINT "PK_704f0f553f063ba1ce9bd1e498b" PRIMARY KEY ("income_id", "payment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8589d87b277e5faf33f7564dd" ON "budget_income_payments" ("income_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc2e0f42976329cc152e1a2a2f" ON "budget_income_payments" ("payment_id") `);
        await queryRunner.query(`CREATE TABLE "budget_expense_payments" ("expense_id" integer NOT NULL, "payment_id" integer NOT NULL, CONSTRAINT "PK_c544b531b5220912af5810bde71" PRIMARY KEY ("expense_id", "payment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9722cde5d73e4f90a3c4f72fa6" ON "budget_expense_payments" ("expense_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_94a4d5acf4bee330b4c76c2462" ON "budget_expense_payments" ("payment_id") `);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_a686f2a046eb88d479b13b4658f" FOREIGN KEY ("currency_id") REFERENCES "account_currency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_0c2788c000c47176b48596cad1a" FOREIGN KEY ("currency_id") REFERENCES "account_currency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment" ADD CONSTRAINT "FK_8e1890bb6d50b179732bfa38b4e" FOREIGN KEY ("acount_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_income" ADD CONSTRAINT "FK_019cf2605e1c17b264eb5665975" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_34f1046cd13a54a29735b8fa258" FOREIGN KEY ("project_type_id") REFERENCES "project_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_expense" ADD CONSTRAINT "FK_9028f32784b332e818bf03056da" FOREIGN KEY ("budget_id") REFERENCES "budget"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_040584adf91405ae1fd5cac06e3" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget" ADD CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d" FOREIGN KEY ("budget_unit_id") REFERENCES "budget_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budget_income_payments" ADD CONSTRAINT "FK_d8589d87b277e5faf33f7564ddc" FOREIGN KEY ("income_id") REFERENCES "budget_income"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "budget_income_payments" ADD CONSTRAINT "FK_bc2e0f42976329cc152e1a2a2f8" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" ADD CONSTRAINT "FK_9722cde5d73e4f90a3c4f72fa63" FOREIGN KEY ("expense_id") REFERENCES "budget_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" ADD CONSTRAINT "FK_94a4d5acf4bee330b4c76c24629" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" DROP CONSTRAINT "FK_94a4d5acf4bee330b4c76c24629"`);
        await queryRunner.query(`ALTER TABLE "budget_expense_payments" DROP CONSTRAINT "FK_9722cde5d73e4f90a3c4f72fa63"`);
        await queryRunner.query(`ALTER TABLE "budget_income_payments" DROP CONSTRAINT "FK_bc2e0f42976329cc152e1a2a2f8"`);
        await queryRunner.query(`ALTER TABLE "budget_income_payments" DROP CONSTRAINT "FK_d8589d87b277e5faf33f7564ddc"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_38337bf6949dc13ec1da4285e4d"`);
        await queryRunner.query(`ALTER TABLE "budget" DROP CONSTRAINT "FK_040584adf91405ae1fd5cac06e3"`);
        await queryRunner.query(`ALTER TABLE "budget_expense" DROP CONSTRAINT "FK_9028f32784b332e818bf03056da"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_34f1046cd13a54a29735b8fa258"`);
        await queryRunner.query(`ALTER TABLE "budget_income" DROP CONSTRAINT "FK_019cf2605e1c17b264eb5665975"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_8e1890bb6d50b179732bfa38b4e"`);
        await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_0c2788c000c47176b48596cad1a"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_a686f2a046eb88d479b13b4658f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_94a4d5acf4bee330b4c76c2462"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9722cde5d73e4f90a3c4f72fa6"`);
        await queryRunner.query(`DROP TABLE "budget_expense_payments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc2e0f42976329cc152e1a2a2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8589d87b277e5faf33f7564dd"`);
        await queryRunner.query(`DROP TABLE "budget_income_payments"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "budget"`);
        await queryRunner.query(`DROP TABLE "budget_expense"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d04865be9fcf7a194226b74b91"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "budget_income"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "account_currency"`);
        await queryRunner.query(`DROP TABLE "project_type"`);
        await queryRunner.query(`DROP TABLE "budget_unit"`);
    }

}
