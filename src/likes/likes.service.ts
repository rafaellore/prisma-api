import { Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly repository: LikesRepository) {}
  async likePost(userId: number, postId: number) {
    const hasLiked = await this.repository.hasUserLiked(userId, postId);

    if (hasLiked) {
      return this.repository.unlikePost(userId, postId);
    }

    return this.repository.likePost(userId, postId);
  }

  async getLikes(postId: number) {
    const likes = await this.repository.getUsersWhoLiked(postId);
    return likes.map(like => like.user);
  }
}
