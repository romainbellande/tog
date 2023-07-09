import {
  randFutureDate,
  randCompanyName,
  randUuid,
  randSlug,
  randProductDescription,
  randQuote,
  randPastDate,
} from '@ngneat/falso';
import {
  Reference,
  EntityDTO,
  EntityData,
  AssignOptions,
  Loaded,
  Collection,
} from '@mikro-orm/core';
import {
  Referendum,
  ReferendumParticipants,
} from './entities/referendum.entity';

const id = randUuid();

export const referendumFixture: Referendum = {
  answers: [],
  name: randCompanyName(),
  slug: randSlug(),
  description: randProductDescription(),
  question: randQuote(),
  participants: ReferendumParticipants.All,
  participantsExternalIds: [],
  participantsRoles: [],
  startDate: randFutureDate().toISOString(),
  endDate: randFutureDate().toISOString(),
  votes: new Collection(undefined),
  id,
  createdAt: randPastDate(),
  updatedAt: randPastDate(),

  isInitialized: function (): boolean {
    throw new Error('Function not implemented.');
  },
  isTouched: function (): boolean {
    throw new Error('Function not implemented.');
  },
  populated: function (populated?: boolean): void {
    throw new Error('Function not implemented.');
  },
  toReference: function (): { id: string } & Reference<Referendum> {
    throw new Error('Function not implemented.');
  },
  toObject: function (ignoreFields?: string[]): EntityDTO<Referendum> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (...args: any[]): EntityDTO<Referendum> {
    throw new Error('Function not implemented.');
  },
  toPOJO: function (): EntityDTO<Referendum> {
    throw new Error('Function not implemented.');
  },
  assign: function (
    data: EntityData<Referendum>,
    options?: AssignOptions
  ): Referendum {
    throw new Error('Function not implemented.');
  },
  init: function <Populate extends string = never>(
    populated?: boolean
  ): Promise<Loaded<Referendum, Populate>> {
    throw new Error('Function not implemented.');
  },
  getSchema: function (): string {
    throw new Error('Function not implemented.');
  },
  setSchema: function (schema?: string): void {
    throw new Error('Function not implemented.');
  },
};
