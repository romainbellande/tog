import { Injectable } from '@nestjs/common';
import { CreateReferendumVoteInput } from './dto/create-referendum-vote.input';
import { UpdateReferendumVoteInput } from './dto/update-referendum-vote.input';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ReferendumVote } from './entities/referendum-vote.entity';

@Injectable()
export class ReferendumVoteService {
  constructor(
    @InjectRepository(ReferendumVote)
    private readonly referendumVoteRepository: EntityRepository<ReferendumVote>,
    private readonly em: EntityManager
  ) {}

  async create(createVoteReferendumInput: CreateReferendumVoteInput) {
    const referendum = this.referendumVoteRepository.create(
      createVoteReferendumInput
    );
    await this.em.persistAndFlush(referendum);
    return referendum;
  }

  findAll() {
    return `This action returns all referendumVote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referendumVote`;
  }

  update(id: number, updateReferendumVoteInput: UpdateReferendumVoteInput) {
    return `This action updates a #${id} referendumVote`;
  }

  remove(id: number) {
    return `This action removes a #${id} referendumVote`;
  }
}
