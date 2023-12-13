import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class JobRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.JobCreateInput }) {
    return this.dbService.job.create({ data });
  }

  findFirst(args: Prisma.JobFindFirstArgs) {
    return this.dbService.job.findFirst(args);
  }

  findAll(args: Prisma.JobFindManyArgs) {
    return this.dbService.job.findMany(args);
  }
}
