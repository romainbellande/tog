import { Referendum } from '@api/entities/referendum.entity';
import { User } from '@api/entities';
import { Entity, ManyToOne, PrimaryKey, Ref, ref } from '@mikro-orm/core';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ReferendumVote {
  @Field(() => Int, { description: 'identifier' })
  @PrimaryKey({ autoincrement: true })
  id: number;

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

  @Field(() => User)
  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;

  @Field(() => Referendum)
  @ManyToOne(() => Referendum, { ref: true })
  referendum: Ref<Referendum>;

  constructor(user: User, referendum: Referendum) {
    this.user = ref(user);
    this.referendum = ref(referendum);
  }
}
