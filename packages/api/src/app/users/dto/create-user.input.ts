import { InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput implements Pick<User, 'name' | 'externalId'> {
  @Field({ description: 'user name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ description: 'user external id' })
  @IsString()
  @IsNotEmpty()
  externalId: string;
}
