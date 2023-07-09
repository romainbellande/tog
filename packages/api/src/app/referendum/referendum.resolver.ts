import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReferendumService } from './referendum.service';
import { Referendum } from '@api/entities/referendum.entity';
import { CreateReferendumInput } from './dto/create-referendum.input';
import { UpdateReferendumInput } from './dto/update-referendum.input';

@Resolver(() => Referendum)
export class ReferendumResolver {
  constructor(private readonly referendumService: ReferendumService) {}

  @Mutation(() => Referendum)
  createReferendum(
    @Args('createReferendumInput') createReferendumInput: CreateReferendumInput
  ) {
    console.log('createReferendumInput :>> ', createReferendumInput);
    return this.referendumService.create(createReferendumInput);
  }

  @Query(() => [Referendum], { name: 'referendums' })
  findAll() {
    return this.referendumService.findAll();
  }

  @Query(() => Referendum, { name: 'referendum' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.referendumService.findOne(id);
  }

  @Mutation(() => Referendum)
  updateReferendum(
    @Args('updateReferendumInput') updateReferendumInput: UpdateReferendumInput
  ) {
    return this.referendumService.update(
      updateReferendumInput.id,
      updateReferendumInput
    );
  }

  @Mutation(() => Referendum)
  removeReferendum(@Args('id', { type: () => Int }) id: number) {
    return this.referendumService.remove(id);
  }
}
