import { IndustryController } from "@modules/industry/industry.controller";
import { IndustryRepository } from "@modules/industry/industry.repository";
import { IndustryService } from "@modules/industry/industry.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [IndustryController],
  providers: [IndustryService, IndustryRepository],
  exports: [IndustryService, IndustryRepository],
})
export class IndustryModule {}
