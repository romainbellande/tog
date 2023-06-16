import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { createUserInputFixture, userFixture } from './user.fixture';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockUserService = {
    create: jest.fn(() => userFixture),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', async () => {
    expect(resolver.createUser(createUserInputFixture)).toEqual(userFixture);
  });
});
