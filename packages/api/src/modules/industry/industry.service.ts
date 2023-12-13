import { IndustryRepository } from "@modules/industry/industry.repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class IndustryService {
  constructor(private readonly employerRepository: IndustryRepository) {}

  async findAll(args: Prisma.IndustryFindManyArgs = {}) {
    return this.employerRepository.findAll(args);
  }
}
