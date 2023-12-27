import { GetJobQueryDto } from '@modules/job/dtos/get-job-query.dto';
import { JobService } from '@modules/job/job.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/pipelines/guard/auth.guard';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('')
  async getJob(@Query() query: GetJobQueryDto) {
    return this.jobService.findAll(query);
  }

  @Get(':id')
  async getJobById(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Post(':id/bookmark')
  @UseGuards(AuthGuard)
  async bookmarkJob(@Req() req: Request, @Param('id') id: string) {
    const reqUser = req['user'];

    return this.jobService.bookmarkJob(reqUser, +id);
  }
}
