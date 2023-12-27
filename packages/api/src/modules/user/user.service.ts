import { CandidateService } from '@modules/candidate/candidate.service';
import { UserRepository } from '@modules/user/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';
import { pick } from 'lodash';

export interface UpdateUserInfoPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  skill: number[];
  looking_for_job: boolean;
}

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly candidateService: CandidateService,
  ) {}

  create(args: { data: Prisma.UserCreateInput }) {
    return this.userRepository.create(args);
  }

  findByEmail(email: string) {
    return this.userRepository.findFirst({
      where: {
        email,
      },
    });
  }

  getUserInfo(id: number) {
    return this.userRepository.findFirst({
      where: {
        id,
      },
      include: {
        candidate: {
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
        employer: true,
      },
    });
  }

  async updateUserInfo(reqUser: any, payload: Partial<UpdateUserInfoPayload>) {
    const user = await this.userRepository.findFirst({
      where: {
        id: reqUser.id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.type === UserType.CANDIDATE) {
      return this.userRepository.update({
        where: {
          id: user.id,
        },
        data: {
          ...pick(payload, ['first_name', 'last_name', 'email']),
          candidate: {
            update: {
              ...pick(payload, ['phone', 'address', 'looking_for_job']),
              skills: {
                create: payload.skill?.map((id) => ({
                  skill: {
                    connect: {
                      id,
                    },
                  },
                })),
              },
            },
          },
        },
      });
    }
  }

  async uploadAndUpdateAvatar(reqUser: any, avatar: Express.Multer.File) {
    const user = await this.userRepository.findFirst({
      where: {
        id: reqUser.id,
      },
    });

    if (!user) {
      throw new HttpException('Auth user not found', HttpStatus.UNAUTHORIZED);
    }

    const updatedUser = await this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: avatar.filename,
      },
    });

    return updatedUser;
  }
}
