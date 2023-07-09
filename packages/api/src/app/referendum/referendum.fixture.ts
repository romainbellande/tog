import {
  randFutureDate,
  randCompanyName,
  randSlug,
  randProductDescription,
  randQuote,
} from '@ngneat/falso';

import { ReferendumParticipants } from '@api/entities';
import { CreateReferendumInput } from './dto/create-referendum.input';

export const createReferendumFixture: CreateReferendumInput = {
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
};
