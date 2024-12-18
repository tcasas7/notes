/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class ManualSyncSchema implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`
      CREATE TABLE "note" (
        "id" SERIAL PRIMARY KEY,
        "title" character varying NOT NULL,
        "content" character varying NOT NULL,
        "isArchived" boolean DEFAULT false,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "tag" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying NOT NULL UNIQUE
      );
    `);

    
    await queryRunner.query(`
      CREATE TABLE "note_tags_tag" (
        "noteId" integer NOT NULL,
        "tagId" integer NOT NULL,
        CONSTRAINT "PK_note_tags_tag" PRIMARY KEY ("noteId", "tagId"),
        CONSTRAINT "FK_note_tags_tag_note" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_note_tags_tag_tag" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`DROP TABLE IF EXISTS "note_tags_tag";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tag";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "note";`);
  }
}
