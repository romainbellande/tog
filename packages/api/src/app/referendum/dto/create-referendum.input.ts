import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ReferendumParticipants } from '../../../entities/referendum.entity';
import { Enum } from '@mikro-orm/core';
import { IsEnum, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateReferendumInput {
  @Field({ description: 'referendum name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ description: 'referendum slug' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field({ description: 'referendum description' })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ description: 'referendum question' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @Field(() => [String], {
    description: 'referendum answers',
    defaultValue: [],
  })
  answers: string[] = [];

  @Field(() => ReferendumParticipants, {
    description: 'referendum participants',
  })
  @Enum(() => ReferendumParticipants)
  @IsEnum(ReferendumParticipants)
  participants: ReferendumParticipants;

  @Field(() => [String], {
    description: 'participants external ids',
    defaultValue: [],
  })
  participantsExternalIds: string[] = [];

  @Field(() => [String], { description: 'participant roles', defaultValue: [] })
  participantsRoles: string[] = [];

  @Field({
    description: 'starting date',
  })
  @IsISO8601()
  @IsOptional()
  startDate: string = new Date().toISOString();

  @Field({ description: 'ending date' })
  @IsISO8601()
  endDate: string;
}
