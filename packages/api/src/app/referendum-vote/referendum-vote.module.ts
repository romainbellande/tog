import { Module } from '@nestjs/common';
import { ReferendumVoteService } from './referendum-vote.service';
import { ReferendumVoteResolver } from './referendum-vote.resolver';
import { ReferendumVote } from './entities/referendum-vote.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([ReferendumVote])],
  providers: [ReferendumVoteResolver, ReferendumVoteService],
})
export class ReferendumVoteModule {}
