import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';

import { entityManagerMock } from '@api/utils/tests';
import { ReferendumService } from './referendum.service';
import { Referendum } from '@api/entities';
import { EntityManager } from '@mikro-orm/core';
import { createReferendumInputFixture } from './referendum.fixture';
import { Validator } from '@api/utils/tests/validator';
import referendumSchema from '@api/entities/json-schema/referendum.json';

describe('ReferendumService', () => {
  let service: ReferendumService;

  const mockReferendumRepository = {
    create: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...new Referendum(),
        ...createReferendumInputFixture,
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

  it('should create a new referendum', async () => {
    const response = await service.create(createReferendumInputFixture);
    const isValid = new Validator(referendumSchema).validate(response);
    expect(isValid).toBeTruthy();
  });
});
