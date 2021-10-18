import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitailMigrations1634584260140 implements MigrationInterface {
  name = 'InitailMigrations1634584260140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "opportunity" ("deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "account" character varying NOT NULL, "win_percentage" numeric(5,2) NOT NULL DEFAULT '0', "primary_contact" character varying, "close_date" TIMESTAMP, "estimated_revenue" character varying, "risk_level" character varying, CONSTRAINT "PK_085fd6d6f4765325e6c16163568" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "account" character varying NOT NULL, "address" character varying NOT NULL, "title" character varying, "work_phone" character varying, "mobile_phone" character varying, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "opp_contact" ("opportunity_id" uuid NOT NULL, "contact_id" uuid NOT NULL, CONSTRAINT "PK_22185b1995316f95bb14d10efe9" PRIMARY KEY ("opportunity_id", "contact_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2234d3ca1a02b08141b519c45c" ON "opp_contact" ("opportunity_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3c35f5f927c6981dd13973834" ON "opp_contact" ("contact_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "opp_contact" ADD CONSTRAINT "FK_2234d3ca1a02b08141b519c45cd" FOREIGN KEY ("opportunity_id") REFERENCES "opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "opp_contact" ADD CONSTRAINT "FK_b3c35f5f927c6981dd139738348" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "opp_contact" DROP CONSTRAINT "FK_b3c35f5f927c6981dd139738348"`,
    );
    await queryRunner.query(
      `ALTER TABLE "opp_contact" DROP CONSTRAINT "FK_2234d3ca1a02b08141b519c45cd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3c35f5f927c6981dd13973834"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2234d3ca1a02b08141b519c45c"`,
    );
    await queryRunner.query(`DROP TABLE "opp_contact"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "opportunity"`);
  }
}
