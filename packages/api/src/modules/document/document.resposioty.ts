import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class DocumentRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create({ data }: { data: Prisma.DocumentCreateInput }) {
    return this.dbService.document.create({ data });
  }

  findMany(args: Prisma.DocumentFindManyArgs) {
    return this.dbService.document.findMany(args);
  }

  findFirst(args: Prisma.DocumentFindFirstArgs) {
    return this.dbService.document.findFirst(args);
  }

  update(args: Prisma.DocumentUpdateArgs) {
    return this.dbService.document.update(args);
  }
}
