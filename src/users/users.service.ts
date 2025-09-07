import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
// import { UnauthorizedError } from 'src/common/errors/types/UnauthoraizedError';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    // throw new UnauthorizedError('Nao autorizado.');
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.remove(id);
  }

  async login(loginDto: LoginUserDto) {
    try {
      const user = await this.usersRepository.findOneByEmail(loginDto.email);

      console.log(loginDto.email);

      if (!user || user.password !== loginDto.password) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials: ' + error);
    }
  }
}
