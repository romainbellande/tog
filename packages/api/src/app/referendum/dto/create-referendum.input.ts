import { InputType, Field } from '@nestjs/graphql';
import { ReferendumParticipants } from '../entities/referendum.entity';
import { Enum } from '@mikro-orm/core';

@InputType()
export class CreateReferendumInput {
  @Field({ description: 'referendum name' })
  name: string;

  @Field({ description: 'referendum slug' })
  slug: string;

  @Field({ description: 'referendum description' })
  description: string;

  @Field({ description: 'referendum question' })
  question: string;

  @Field(() => [String], {
    description: 'referendum answers',
    defaultValue: [],
  })
  answers: string[];

  @Field(() => ReferendumParticipants, {
    description: 'referendum participants',
  })
  @Enum(() => ReferendumParticipants)
  participants: ReferendumParticipants;

  @Field(() => [String], {
    description: 'participants external ids',
    defaultValue: [],
  })
  participantsExternalIds: string[];

  @Field(() => [String], { description: 'participant roles', defaultValue: [] })
  participantsRoles: string[];

  @Field({
    description: 'starting date',
    defaultValue: new Date().toISOString(),
  })
  startDate: string;

  @Field({ description: 'ending date' })
  endDate: string;
}
