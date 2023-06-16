import { Method } from '@api/enums';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UserValidator {
  @IsString()
  @IsOptional({ groups: [Method.Patch] })
  @Field()
  name: string;

  @IsString()
  @IsOptional({ groups: [Method.Patch] })
  externalId: string;
}
