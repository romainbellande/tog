import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@api/entities';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
