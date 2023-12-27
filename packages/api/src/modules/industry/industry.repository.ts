import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class IndustryRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.IndustryCreateInput }) {
    return this.dbService.industry.create({ data });
  }

  findFirst(args: Prisma.IndustryFindFirstArgs) {
    return this.dbService.industry.findFirst(args);
  }

  findAll(args: Prisma.IndustryFindManyArgs) {
    return this.dbService.industry.findMany(args);
  }
}
