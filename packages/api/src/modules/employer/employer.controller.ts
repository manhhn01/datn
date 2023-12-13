import { EmployerService } from "@modules/employer/employer.service";
import { Controller, Get } from "@nestjs/common";

@Controller('employers')
export class EmployerController{
  constructor(
    private readonly employerService: EmployerService,
  ){}

  @Get('')
  async getEmployer(){
    return this.employerService.findAll();
  }
}
