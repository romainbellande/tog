import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { createUserInputFixture } from './user.fixture';
import { User } from '@api/entities';
import userSchema from '@api/entities/json-schema/user.json';
import { Validator } from '@api/utils/tests/validator';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockUserService = {
    create: jest.fn(() => ({
      ...new User(),
      ...createUserInputFixture,
    })),
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
    const response = await resolver.createUser(createUserInputFixture);
    const isValid = new Validator(userSchema).validate(response);
    expect(isValid).toBeTruthy();
  });
});
