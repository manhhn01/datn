import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class SkillRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create(args: { data: Prisma.SkillCreateInput }) {
    return this.dbService.skill.create(args);
  }

  findMany(args: Prisma.SkillFindManyArgs) {
    return this.dbService.skill.findMany(args);
  }

  findFirst(args: Prisma.SkillFindFirstArgs) {
    return this.dbService.skill.findFirst(args);
  }
}
