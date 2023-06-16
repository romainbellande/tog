import { Migration } from '@mikro-orm/migrations';

export class Migration20230615221843 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "external_id" varchar(255) not null, constraint "user_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "user" add constraint "user_name_unique" unique ("name");'
    );
    this.addSql(
      'alter table "user" add constraint "user_external_id_unique" unique ("external_id");'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
