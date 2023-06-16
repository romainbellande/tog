import { CreateReferendumInput } from './create-referendum.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReferendumInput extends PartialType(CreateReferendumInput) {
  @Field(() => Int)
  id: number;
}
