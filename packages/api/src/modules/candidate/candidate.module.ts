import { CandidateController } from '@modules/candidate/candidate.controller';
import { CandidateRepository } from '@modules/candidate/candidate.repository';
import { CandidateService } from '@modules/candidate/candidate.service';
import { JobRepository } from '@modules/job/job.repository';
import { UserRepository } from '@modules/user/user.repository';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentConfigService } from 'src/storage/multer/document-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: DocumentConfigService,
    }),
  ],
  controllers: [CandidateController],
  providers: [
    CandidateService,
    CandidateRepository,
    UserRepository,
    JobRepository,
  ],
  exports: [CandidateService, CandidateRepository],
})
export class CandidateModule {}
