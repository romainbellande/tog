import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { CreateReferendumInput } from './dto/create-referendum.input';
import { UpdateReferendumInput } from './dto/update-referendum.input';
import { Referendum } from '@api/entities/referendum.entity';

@Injectable()
export class ReferendumService {
  constructor(
    @InjectRepository(Referendum)
    private readonly referendumRepository: EntityRepository<Referendum>,
    private readonly em: EntityManager
  ) {}

  async create(createReferendumInput: CreateReferendumInput) {
    const referendum = this.referendumRepository.create(createReferendumInput);
    await this.em.persistAndFlush(referendum);
    return referendum;
  }

  findAll() {
    return this.referendumRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} referendum`;
  }

  update(id: number, updateReferendumInput: UpdateReferendumInput) {
    return `This action updates a #${id} referendum`;
  }

  remove(id: number) {
    return `This action removes a #${id} referendum`;
  }
}
