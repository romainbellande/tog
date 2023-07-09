import { Test, TestingModule } from '@nestjs/testing';
import { ReferendumResolver } from './referendum.resolver';
import { ReferendumService } from './referendum.service';
import { createReferendumInputFixture } from './referendum.fixture';
import { Referendum } from '@api/entities';
import { Validator } from '@api/utils/tests/validator';
import referendumSchema from '@api/entities/json-schema/referendum.json';

describe('ReferendumResolver', () => {
  let resolver: ReferendumResolver;

  const mockReferendumService = {
    create: jest.fn(() => ({
      ...new Referendum(),
      ...createReferendumInputFixture,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferendumResolver,
        { provide: ReferendumService, useValue: mockReferendumService },
      ],
    }).compile();

    resolver = module.get<ReferendumResolver>(ReferendumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a referendum', async () => {
    const response = await resolver.createReferendum(
      createReferendumInputFixture
    );
    const isValid = new Validator(referendumSchema).validate(response);
    expect(isValid).toBeTruthy();
  });
});
