import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, PrismaService],
})
export class LikesModule {}
