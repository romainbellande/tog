import { Test, TestingModule } from '@nestjs/testing';
import { ReferendumResolver } from './referendum.resolver';
import { ReferendumService } from './referendum.service';

describe('ReferendumResolver', () => {
  let resolver: ReferendumResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferendumResolver, ReferendumService],
    }).compile();

    resolver = module.get<ReferendumResolver>(ReferendumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
