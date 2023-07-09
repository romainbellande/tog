import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { entityManagerMock } from '@api/utils/tests';
import { User } from '@api/entities';
import { UsersService } from './users.service';
import { createUserInputFixture } from './user.fixture';
import userSchema from '@api/entities/json-schema/user.json';
import { Validator } from '@api/utils/tests/validator';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...new User(),
        ...createUserInputFixture,
      })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: EntityManager,
          useValue: entityManagerMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const response = await service.create(createUserInputFixture);
    const isValid = new Validator(userSchema).validate(response);
    expect(isValid).toBeTruthy();
  });
});
