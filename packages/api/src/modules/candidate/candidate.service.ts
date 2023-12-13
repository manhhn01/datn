import { CandidateBookmarkRepository } from '@modules/candidate-bookmark/candidate-bookmark.repository';
import { CandidateRepository } from '@modules/candidate/candidate.repository';
import { DocumentRepository } from '@modules/document/document.resposioty';
import { JobRepository } from '@modules/job/job.repository';
import { UserRepository } from '@modules/user/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Candidate, Prisma, UserType } from '@prisma/client';

@Injectable()
export class CandidateService {
  constructor(
    private readonly candidateRepository: CandidateRepository,
    private readonly userRepository: UserRepository,
    private readonly documentRepository: DocumentRepository,
    private readonly candidateBookmarkRepository: CandidateBookmarkRepository,
    private readonly jobRepository: JobRepository,
  ) {}

  async create(args: { data: Prisma.CandidateCreateInput }) {
    return await this.candidateRepository.create(args);
  }

  update(args: Prisma.CandidateUpdateArgs) {
    return this.candidateRepository.update(args);
  }

  async getResumes(reqUser: any, selfCreated?: boolean) {
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

    if (user.type === UserType.CANDIDATE) {
      return this.documentRepository.findMany({
        where: {
          candidate_id: user.candidate.id,
          ...(selfCreated
            ? {
                template: {
                  equals: Prisma.AnyNull,
                },
              }
            : {
                NOT: {
                  template: {
                    equals: Prisma.AnyNull,
                  },
                },
              }),
        },
      });
    } else {
      throw new HttpException(
        'You are not allowed to get resume',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async uploadAndSaveResume(
    reqUser: any,
    file: Express.Multer.File,
    title: string,
    template?: any,
  ) {
    const user = await this.userRepository.findFirst({
      where: {
        id: reqUser.id,
      },
      include: {
        candidate: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.type === UserType.CANDIDATE) {
      return this.candidateRepository.update({
        where: {
          user_id: user.id,
        },
        data: {
          documents: {
            create: {
              title: title,
              path: file.filename,
              name: file.originalname,
              template,
            },
          },
        },
      });
    } else {
      throw new HttpException(
        'You are not allowed to upload resume',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateResumeTitle(reqUser: any, id: number, title: string) {
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

    if (user.type === UserType.CANDIDATE) {
      return this.documentRepository.update({
        where: {
          id,
          candidate_id: user.candidate.id,
        },
        data: {
          title,
        },
      });
    }

    throw new HttpException(
      'You are not allowed to update resume',
      HttpStatus.FORBIDDEN,
    );
  }

  async getBookmarks(reqUser: any) {
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

    if (user.type === UserType.CANDIDATE) {
      return this.candidateBookmarkRepository.findMany({
        where: {
          candidate_id: user.candidate.id,
        },
        include: {
          job: {
            include: {
              employer: true,
            },
          },
        },
      });
    }

    throw new HttpException(
      'You are not allowed to get bookmarked jobs',
      HttpStatus.FORBIDDEN,
    );
  }
}
