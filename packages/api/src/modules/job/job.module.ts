import { JobController } from '@modules/job/job.controller';
import { JobRepository } from '@modules/job/job.repository';
import { JobService } from '@modules/job/job.service';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService, JobRepository],
})
export class JobModule {}
