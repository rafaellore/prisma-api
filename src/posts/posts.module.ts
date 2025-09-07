import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsRepository } from './repositories/posts.repository';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, PostsRepository, UploadService],
})
export class PostsModule {}
