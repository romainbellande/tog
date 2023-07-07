import { randPastDate, randUserName, randUuid } from '@ngneat/falso';
import { User } from '@api/entities';
import {
  Reference,
  EntityDTO,
  EntityData,
  AssignOptions,
  Loaded,
} from '@mikro-orm/core';
import { CreateUserInput } from './dto/create-user.input';

const id = randUuid();

export const createUserInputFixture: CreateUserInput = {
  name: randUserName(),
  externalId: randUuid(),
};

export const userFixture: User = {
  id,
  name: createUserInputFixture.name,
  externalId: createUserInputFixture.externalId,
  createdAt: randPastDate(),
  updatedAt: randPastDate(),

  populate() {
    throw new Error('Function not implemented.');
  },

  isInitialized: function (): boolean {
    return true;
  },
  isTouched: function (): boolean {
    return true;
  },
  populated: function (populated?: boolean): void {
    // nothing to do
  },
  toReference: function (): { id: string } & Reference<User> {
    throw new Error('Function not implemented.');
  },
  toObject: function (ignoreFields?: string[]): EntityDTO<User> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (...args: any[]): EntityDTO<User> {
    throw new Error('Function not implemented.');
  },
  toPOJO: function (): EntityDTO<User> {
    throw new Error('Function not implemented.');
  },
  assign: function (data: EntityData<User>, options?: AssignOptions): User {
    throw new Error('Function not implemented.');
  },
  init: function <Populate extends string = never>(
    populated?: boolean
  ): Promise<Loaded<User, Populate>> {
    throw new Error('Function not implemented.');
  },
  getSchema: function (): string {
    throw new Error('Function not implemented.');
  },
  setSchema: function (schema?: string): void {
    throw new Error('Function not implemented.');
  },
};
