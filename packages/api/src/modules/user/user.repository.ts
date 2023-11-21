import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.UserCreateInput }) {
    return this.dbService.user.create({ data });
  }

  findFirst(args: Prisma.UserFindFirstArgs) {
    return this.dbService.user.findFirst(args);
  }
}
