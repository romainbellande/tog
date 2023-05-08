import { Migration } from '@mikro-orm/migrations';

export class Migration20230507164702 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "external_id" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');
    this.addSql('alter table "user" add constraint "user_external_id_unique" unique ("external_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table "user";');
  }
}
