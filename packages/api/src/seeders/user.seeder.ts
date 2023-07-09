import { Factory, Faker, Seeder } from '@mikro-orm/seeder';
import { User } from '@api/entities';
import { EntityManager } from '@mikro-orm/core';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    return {
      name: faker.name.fullName(),
      externalId: faker.datatype.uuid(),
    };
  }
}

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new UserFactory(em).make(10);
  }
}
