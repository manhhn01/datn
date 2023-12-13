import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class CandidateRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.CandidateCreateInput }) {
    return this.dbService.candidate.create({ data });
  }

  findFirst(args: Prisma.CandidateFindFirstArgs) {
    return this.dbService.candidate.findFirst(args);
  }

  update(args: Prisma.CandidateUpdateArgs) {
    return this.dbService.candidate.update(args);
  }
}
