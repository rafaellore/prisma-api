import { User } from '@prisma/client';

export class UserEntity implements User {
  name: string;
  id: number;
  email: string;
  password: string;
  admin: boolean;
  createdAt: Date;
}
