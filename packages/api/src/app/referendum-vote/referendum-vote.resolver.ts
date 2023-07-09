import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReferendumVoteService } from './referendum-vote.service';
import { ReferendumVote } from '@api/entities';
import { CreateReferendumVoteInput } from './dto/create-referendum-vote.input';
import { UpdateReferendumVoteInput } from './dto/update-referendum-vote.input';

@Resolver(() => ReferendumVote)
export class ReferendumVoteResolver {
  constructor(private readonly referendumVoteService: ReferendumVoteService) {}

  @Mutation(() => ReferendumVote)
  createReferendumVote(
    @Args('createReferendumVoteInput')
    createReferendumVoteInput: CreateReferendumVoteInput
  ) {
    return this.referendumVoteService.create(createReferendumVoteInput);
  }

  @Query(() => [ReferendumVote], { name: 'referendumVote' })
  findAll() {
    return this.referendumVoteService.findAll();
  }

  @Query(() => ReferendumVote, { name: 'referendumVote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.referendumVoteService.findOne(id);
  }

  @Mutation(() => ReferendumVote)
  updateReferendumVote(
    @Args('updateReferendumVoteInput')
    updateReferendumVoteInput: UpdateReferendumVoteInput
  ) {
    return this.referendumVoteService.update(
      updateReferendumVoteInput.id,
      updateReferendumVoteInput
    );
  }

  @Mutation(() => ReferendumVote)
  removeReferendumVote(@Args('id', { type: () => Int }) id: number) {
    return this.referendumVoteService.remove(id);
  }
}
