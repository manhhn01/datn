import { SkillRepository } from '@modules/skill/skill.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillService {
  constructor(private readonly skillRepository: SkillRepository) {}

  getAllSkills() {
    return this.skillRepository.findMany({
      include: {
        industry: true,
      }
    });
  }
}
