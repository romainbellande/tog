import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';

import { entityManagerMock } from '@api/utils/tests';
import { ReferendumService } from './referendum.service';
import { Referendum } from '@api/entities';
import { EntityManager } from '@mikro-orm/core';
import { createReferendumFixture } from './referendum.fixture';

describe('ReferendumService', () => {
  let service: ReferendumService;

  const mockReferendumRepository = {
    create: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...new Referendum(),
        ...createReferendumFixture,
      })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferendumService,
        {
          provide: getRepositoryToken(Referendum),
          useValue: mockReferendumRepository,
        },
        {
          provide: EntityManager,
          useValue: entityManagerMock,
        },
      ],
    }).compile();

    service = module.get<ReferendumService>(ReferendumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
