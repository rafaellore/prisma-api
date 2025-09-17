import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(userId: number, postId: number) {
    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async unlikePost(userId: number, postId: number) {
    return this.prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });
  }

  async hasUserLiked(userId: number, postId: number) {
    return this.prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });
  }

  async countLikes(postId: number) {
    return this.prisma.like.count({
      where: { postId },
    });
  }

  async getUsersWhoLiked(postId: number) {
    return this.prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
    });
  }
}
