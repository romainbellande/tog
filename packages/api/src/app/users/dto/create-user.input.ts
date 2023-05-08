import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'user name' })
  name: string;

  @Field({ description: 'user external id' })
  externalId: string;
}
