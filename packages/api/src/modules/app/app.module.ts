import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from '@config/app';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { CommonModule } from '@modules/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { EmployerModule } from '@modules/employer/employer.module';
import { IndustryModule } from '@modules/industry/industry.module';
import { JobModule } from '@modules/job/job.module';
import { CandidateModule } from '@modules/candidate/candidate.module';
import { SkillModule } from '@modules/skill/skill.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'uploads'),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('app.JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>('app.JWT_EXPIRES_IN'),
        },
      }),
    }),

    CommonModule,
    AuthModule,
    UserModule,
    CandidateModule,
    EmployerModule,
    IndustryModule,
    JobModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
