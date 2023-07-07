import { Base } from '@api/utils/base.entity';
import { Entity, Property } from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User extends Base<User> {
  @Field({ description: 'user name' })
  @Property({ unique: true })
  name: string;

  @Field({ description: 'user external id' })
  @Property({ unique: true })
  externalId: string;

  // @Field(() => [Cascade])
  // @OneToMany(() => ReferendumVote, (referendumVote) => referendumVote.user, {
  //   cascade: [Cascade.ALL],
  // })
  // referendumVotes = new Collection<ReferendumVote>(this);
}
