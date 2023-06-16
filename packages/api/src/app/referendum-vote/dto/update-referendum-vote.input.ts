import { CreateReferendumVoteInput } from './create-referendum-vote.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReferendumVoteInput extends PartialType(CreateReferendumVoteInput) {
  @Field(() => Int)
  id: number;
}
