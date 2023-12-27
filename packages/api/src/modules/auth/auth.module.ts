import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { CandidateModule } from '@modules/candidate/candidate.module';
import { EmployerModule } from '@modules/employer/employer.module';
import { UserModule } from '@modules/user/user.module';
import { UserService } from '@modules/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, CandidateModule, EmployerModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
