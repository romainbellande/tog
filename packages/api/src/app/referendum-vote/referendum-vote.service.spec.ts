import { Test, TestingModule } from '@nestjs/testing';
import { ReferendumVoteService } from './referendum-vote.service';

describe('ReferendumVoteService', () => {
  let service: ReferendumVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferendumVoteService],
    }).compile();

    service = module.get<ReferendumVoteService>(ReferendumVoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
