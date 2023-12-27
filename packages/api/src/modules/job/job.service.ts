import { CandidateBookmarkRepository } from '@modules/candidate-bookmark/candidate-bookmark.repository';
import { GetJobQueryDto } from '@modules/job/dtos/get-job-query.dto';
import { JobRepository } from '@modules/job/job.repository';
import { UserRepository } from '@modules/user/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jobRepository: JobRepository,
    private readonly candidateBookmarkRepository: CandidateBookmarkRepository,
  ) {}

  async findAll(data: GetJobQueryDto) {
    return this.jobRepository.findAll({
      skip: data.skip ? +data.skip : 0,
      take: data.take ? +data.take : 20,
      orderBy: {
        [data.sortBy || 'created_at']: data.sortDirection || 'desc',
      },
      include: {
        employer: true,
        skills: true,
      },
      where: {
        ...(data.keyword
          ? {
              title: {
                contains: data.keyword,
                mode: 'insensitive',
              },
            }
          : undefined),
        ...(data.location
          ? {
              location: {
                contains: data.location,
                mode: 'insensitive',
              },
            }
          : undefined),
      },
    });
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findFirst({
      where: {
        id,
      },
      include: {
        employer: true,
        skills: true,
      },
    });

    if (!job) {
      throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
    }

    return job;
  }

  async bookmarkJob(reqUser: any, id: number) {
    const user = (await this.userRepository.findFirst({
      where: {
        id: reqUser.id,
      },
      include: {
        candidate: true,
      },
    })) as Prisma.UserGetPayload<{
      include: {
        candidate: true;
      };
    }>;

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const existingBookmark = await this.candidateBookmarkRepository.findFirst({
      where: {
        candidate_id: user.candidate.id,
        job_id: id,
      },
    });

    if (existingBookmark) {
      return this.candidateBookmarkRepository.delete({
        where: {
          id: existingBookmark.id,
        },
      });
    }

    if (user.type === UserType.CANDIDATE) {
      return this.candidateBookmarkRepository.create({
        data: {
          candidate: {
            connect: {
              id: user.candidate.id,
            },
          },
          job: {
            connect: {
              id,
            },
          },
        },
      });
    }

    throw new HttpException(
      'You are not allowed to bookmark job',
      HttpStatus.FORBIDDEN,
    );
  }
}
