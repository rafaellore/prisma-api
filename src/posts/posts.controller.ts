import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from '../upload/dto/upload.dto';
import { UploadService } from '../upload/upload.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file?: FileDTO,
  ) {
    let imageUrl: string | null = null;

    if (file) {
      const uploaded = await this.uploadService.upload(file);

      console.log('uploaded', uploaded);
      imageUrl = uploaded.url;
    }

    return this.postsService.create({
      ...createPostDto,
      image: imageUrl || undefined,
    });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Post(':id/like')
  toggleLike(@Param('id') id: string, @Body('userId') userId: number) {
    return this.postsService.toggleLike(+id, userId);
  }
}
