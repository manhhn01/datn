import { EmployerRepository } from "@modules/employer/employer.repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  async create(args: Prisma.EmployerCreateArgs) {
    return this.employerRepository.create(args);
  }

  async findAll(args: Prisma.EmployerFindManyArgs = {}) {
    return this.employerRepository.findAll(args);
  }
}
