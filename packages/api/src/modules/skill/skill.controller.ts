import { SkillService } from "@modules/skill/skill.service";
import { Controller, Get } from "@nestjs/common";

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get('')
  async getAllSkills() {
    return this.skillService.getAllSkills();
  }
}
