/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaFix1734562810058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
    CREATE TABLE "tag" (
      "id" SERIAL NOT NULL, 
      "name" character varying NOT NULL UNIQUE, 
      CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
    );
  `);
    
    await queryRunner.query(`
      CREATE TABLE "note" (
        "id" SERIAL NOT NULL, 
        "title" character varying NOT NULL, 
        "content" character varying NOT NULL, 
        "isArchived" boolean NOT NULL DEFAULT false, 
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
      );
    `);

    
    await queryRunner.query(`
      CREATE TABLE "note_tags_tag" (
        "noteId" INTEGER NOT NULL,
        "tagId" INTEGER NOT NULL
      );
    `);

    
    await queryRunner.query(`
      ALTER TABLE "note_tags_tag" 
      ADD CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6" 
      FOREIGN KEY ("noteId") REFERENCES "note"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   
    await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_9f68bc1292e61b17fc1e3b4a8f1";`);
    await queryRunner.query(`ALTER TABLE "note_tags_tag" DROP CONSTRAINT "FK_6e5b1c3234803e65ef062812cf6";`);

    
    await queryRunner.query(`DROP TABLE "note_tags_tag";`);
    await queryRunner.query(`DROP TABLE "note";`);
    await queryRunner.query(`DROP TABLE "tag";`);
  }
}