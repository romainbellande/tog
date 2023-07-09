import { ReferendumVote } from '@api/app/referendum-vote/entities/referendum-vote.entity';
import { OneToMany, Property, Collection, Entity, Enum } from '@mikro-orm/core';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Base } from '@api/utils/base.entity';

@ObjectType()
@Entity()
export class Referendum extends Base<Referendum> {
  @Field({ description: 'referendum name' })
  @Property({ unique: true })
  name: string;

  @Field({ description: 'referendum slug' })
  @Property({ unique: true })
  slug: string;

  @Field({ description: 'referendum description' })
  @Property()
  description: string;

  @Field({ description: 'referendum question' })
  @Property()
  question: string;

  @Field(() => [String], {
    description: 'referendum answers',
    defaultValue: [],
  })
  @Property()
  answers: string[];

  @Field({ description: 'referendum participants' })
  @Enum(() => ReferendumParticipants)
  @Property()
  participants: ReferendumParticipants;

  @Field(() => [String], {
    description: 'participants external ids',
    defaultValue: [],
  })
  @Property()
  participantsExternalIds: string[];

  @Field(() => [String], { description: 'participant roles', defaultValue: [] })
  @Property()
  participantsRoles: string[];

  @Field({ description: 'starting date' })
  @Property()
  startDate: string;

  @Field({ description: 'ending date' })
  @Property()
  endDate: string;

  @Field(() => [ReferendumVote], { description: 'vites', defaultValue: [] })
  @OneToMany(() => ReferendumVote, (vote) => vote.referendum)
  votes = new Collection<ReferendumVote>(this);
}

export enum ReferendumParticipants {
  All = 'ALL',
  ByName = 'BY_NAME',
  ByRole = 'BY_ROLE',
}

registerEnumType(ReferendumParticipants, { name: 'ReferendumParticipants' });
