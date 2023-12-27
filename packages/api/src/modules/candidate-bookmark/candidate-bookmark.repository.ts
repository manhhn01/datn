import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class CandidateBookmarkRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.CandidateBookmarkCreateInput }) {
    return this.dbService.candidateBookmark.create({ data });
  }

  findFirst(args: Prisma.CandidateBookmarkFindFirstArgs) {
    return this.dbService.candidateBookmark.findFirst(args);
  }

  update(args: Prisma.CandidateBookmarkUpdateArgs) {
    return this.dbService.candidateBookmark.update(args);
  }

  findMany(args: Prisma.CandidateBookmarkFindManyArgs) {
    return this.dbService.candidateBookmark.findMany(args);
  }

  delete(args: Prisma.CandidateBookmarkDeleteArgs) {
    return this.dbService.candidateBookmark.delete(args);
  }
}
