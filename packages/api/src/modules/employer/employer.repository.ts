import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/databases/database.service';

@Injectable()
export class EmployerRepository {
  constructor(private readonly dbService: DatabaseService) {}

  create(args: Prisma.EmployerCreateArgs) {
    return this.dbService.employer.create(args);
  }

  findFirst(args: Prisma.EmployerFindFirstArgs) {
    return this.dbService.employer.findFirst(args);
  }

  findAll(args: Prisma.EmployerFindManyArgs) {
    return this.dbService.employer.findMany(args);
  }
}
