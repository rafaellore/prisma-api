import { ApiProperty } from '@nestjs/swagger';
import { Like, Post } from '@prisma/client';
import { LikeEntity } from 'src/likes/entities/like.entity';

export class PostEntity implements Post {
  id: number;
  published: boolean;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number | null;
  image: string | null;

  @ApiProperty({ type: () => [LikeEntity], required: false })
  likes?: Like[];
}
