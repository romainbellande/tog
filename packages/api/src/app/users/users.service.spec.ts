import { createUserInputFixture, userFixture } from './user.fixture';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockEntityManager = {
    persistAndFlush: jest.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
  };

  const mockUserRepository = {
    create: jest.fn().mockImplementation(() => Promise.resolve(userFixture)),
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
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    expect(await service.create(createUserInputFixture)).toEqual(userFixture);
  });
});
