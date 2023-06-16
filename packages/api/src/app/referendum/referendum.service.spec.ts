import { Test, TestingModule } from '@nestjs/testing';
import { ReferendumService } from './referendum.service';

describe('ReferendumService', () => {
  let service: ReferendumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferendumService],
    }).compile();

    service = module.get<ReferendumService>(ReferendumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
