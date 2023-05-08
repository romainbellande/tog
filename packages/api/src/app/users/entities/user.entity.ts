import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int, { description: 'user identifier' })
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Field({ description: 'user name' })
  @Property({ unique: true })
  name: string;

  @Field({ description: 'user external id' })
  @Property({ unique: true })
  externalId: string;
}
