import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    await this.em.persistAndFlush(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
