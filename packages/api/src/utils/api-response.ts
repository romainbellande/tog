import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApiResponse {
  @Field(() => Int, { description: 'identifier', nullable: true })
  id?: number;

  @Field(() => Int, { description: 'http status code' })
  status: number;

  @Field(() => Int, { description: 'response code', nullable: true })
  code?: number;

  @Field(() => String, { description: 'response message' })
  message: string;

  static created({
    id,
    message = 'success',
  }: {
    id?: number;
    message?: string;
  }): ApiResponse {
    return {
      id,
      status: 201,
      message,
    };
  }
}
