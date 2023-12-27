import { EmployerController } from "@modules/employer/employer.controller";
import { EmployerRepository } from "@modules/employer/employer.repository";
import { EmployerService } from "@modules/employer/employer.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [EmployerController],
  providers: [EmployerService, EmployerRepository],
  exports: [EmployerService, EmployerRepository],
})
export class EmployerModule {}
