import { Referendum } from '@api/entities';
import { User } from '@api/entities';
import { Base } from '@api/utils/base.entity';
import { Entity, ManyToOne, Ref, ref } from '@mikro-orm/core';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class ReferendumVote extends Base<ReferendumVote> {
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
    super();
    this.user = ref(user);
    this.referendum = ref(referendum);
  }
}
