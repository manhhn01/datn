import { CandidateService } from '@modules/candidate/candidate.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/pipelines/guard/auth.guard';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('resume')
  @UseGuards(AuthGuard)
  getResumes(@Req() req: Request, @Query('selfCreated') selfCreated?: boolean) {
    const reqUser = req['user'];

    return this.candidateService.getResumes(reqUser, selfCreated);
  }

  @Post('resume')
  @UseInterceptors(FileInterceptor('resume'))
  @UseGuards(AuthGuard)
  uploadResume(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body('template') template: unknown,
    @Body('title') title: string,
  ) {
    const reqUser = req['user'];

    return this.candidateService.uploadAndSaveResume(
      reqUser,
      file,
      title,
      template,
    );
  }

  @Post('resume/:id/title')
  @UseGuards(AuthGuard)
  updateResumeTitle(
    @Req() req: Request,
    @Body('title') title: string,
    @Param('id') id: string,
  ) {
    const reqUser = req['user'];

    return this.candidateService.updateResumeTitle(reqUser, +id, title);
  }

  @Get('bookmarks')
  @UseGuards(AuthGuard)
  getBookmarks(@Req() req: Request) {
    const reqUser = req['user'];

    return this.candidateService.getBookmarks(reqUser);
  }
}
