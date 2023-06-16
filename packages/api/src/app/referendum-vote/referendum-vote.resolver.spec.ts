import { Test, TestingModule } from '@nestjs/testing';
import { ReferendumVoteResolver } from './referendum-vote.resolver';
import { ReferendumVoteService } from './referendum-vote.service';

describe('ReferendumVoteResolver', () => {
  let resolver: ReferendumVoteResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferendumVoteResolver, ReferendumVoteService],
    }).compile();

    resolver = module.get<ReferendumVoteResolver>(ReferendumVoteResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
