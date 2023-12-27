import { IndustryService } from "@modules/industry/industry.service";
import { Controller, Get } from "@nestjs/common";

@Controller('industries')
export class IndustryController{
  constructor(
    private readonly industryService: IndustryService,
  ){}

  @Get('')
  async getIndustry(){
    return this.industryService.findAll();
  }
}
