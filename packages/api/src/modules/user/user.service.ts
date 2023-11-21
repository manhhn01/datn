import { UserRepository } from '@modules/user/user.repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  create(args: { data: Prisma.UserCreateInput }) {
    return this.userRepository.create(args);
  }

  findByEmail(email: string) {
    return this.userRepository.findFirst({
      where: {
        email,
      },
    });
  }
}
