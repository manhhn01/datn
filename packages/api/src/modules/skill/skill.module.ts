import { SkillController } from "@modules/skill/skill.controller";
import { SkillRepository } from "@modules/skill/skill.repository";
import { SkillService } from "@modules/skill/skill.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
  exports: [],
})
export class SkillModule {}
