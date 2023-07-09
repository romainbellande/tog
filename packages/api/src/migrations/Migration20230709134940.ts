import { Migration } from '@mikro-orm/migrations';

export class Migration20230709134940 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "referendum" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "slug" varchar(255) not null, "description" varchar(255) not null, "question" varchar(255) not null, "answers" text[] not null, "participants" text check ("participants" in (\'ALL\', \'BY_NAME\', \'BY_ROLE\')) not null, "participants_external_ids" text[] not null, "participants_roles" text[] not null, "start_date" varchar(255) not null, "end_date" varchar(255) not null, constraint "referendum_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "referendum" add constraint "referendum_name_unique" unique ("name");'
    );
    this.addSql(
      'alter table "referendum" add constraint "referendum_slug_unique" unique ("slug");'
    );

    this.addSql(
      'create table "referendum_vote" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" uuid not null, "referendum_id" uuid not null, constraint "referendum_vote_pkey" primary key ("id"));'
    );

    this.addSql(
      'alter table "referendum_vote" add constraint "referendum_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "referendum_vote" add constraint "referendum_vote_referendum_id_foreign" foreign key ("referendum_id") references "referendum" ("id") on update cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "referendum_vote" drop constraint "referendum_vote_referendum_id_foreign";'
    );

    this.addSql('drop table if exists "referendum" cascade;');

    this.addSql('drop table if exists "referendum_vote" cascade;');
  }
}
