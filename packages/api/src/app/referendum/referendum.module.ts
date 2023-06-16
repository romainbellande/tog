import { Module } from '@nestjs/common';
import { ReferendumService } from './referendum.service';
import { ReferendumResolver } from './referendum.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Referendum } from './entities/referendum.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Referendum])],
  providers: [ReferendumResolver, ReferendumService],
})
export class ReferendumModule {}
