import { randUserName, randUuid } from '@ngneat/falso';

import { CreateUserInput } from './dto/create-user.input';

export const createUserInputFixture: CreateUserInput = {
  name: randUserName(),
  externalId: randUuid(),
};
