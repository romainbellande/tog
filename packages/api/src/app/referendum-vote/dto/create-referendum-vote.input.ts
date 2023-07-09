import { InputType, Int, Field } from '@nestjs/graphql';
import { ReferendumVote } from '@api/entities';

@InputType()
export class CreateReferendumVoteInput
  implements Pick<ReferendumVote, 'answer' | 'yes'>
{
  @Field({
    description: 'vote answer if there is multiple questions',
    nullable: true,
  })
  answer?: string;

  @Field({
    description: 'true if there is a yer or no question',
    defaultValue: false,
  })
  yes: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  referendumId: number;
}
