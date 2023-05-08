import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

class ApiResponse {
  id?: number;
  status: number;
  code?: number;
  message: string;

  static created({ id, message = 'success' }: { id?: number, message?: string }): ApiResponse {
    return {
      id,
      status: 201,
      message,
    };
  }
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>, private readonly em: EntityManager) {}

  async create(createUserInput: CreateUserInput): Promise<ApiResponse> {
    const user = this.userRepository.create(createUserInput);
    await this.em.persistAndFlush(user);
    return ApiResponse.created({ id: user.id })
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
