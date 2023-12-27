import { CandidateModule } from '@modules/candidate/candidate.module';
import { UserController } from '@modules/user/user.controller';
import { UserRepository } from '@modules/user/user.repository';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageConfigService } from 'src/storage/multer/image-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: ImageConfigService,
    }),
    CandidateModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
