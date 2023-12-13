import { LoginDto } from '@modules/auth/dtos/login.dto';
import { RegisterDto } from '@modules/auth/dtos/register.dto';
import { CandidateService } from '@modules/candidate/candidate.service';
import { EmployerService } from '@modules/employer/employer.service';
import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { AppConfig } from 'src/types/config';

@Injectable()
export class AuthService {
  private appConfig: AppConfig;

  constructor(
    readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly candidateService: CandidateService,
    private readonly employerService: EmployerService,
  ) {
    this.appConfig = this.configService.get<AppConfig>('app');
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      type: user.type,
    });

    return {
      accessToken: token,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: await this.hashPassword(data.password),
        type: data.type,
      },
    });

    if (data.type === UserType.CANDIDATE) {
      await this.candidateService.create({
        data: {
          email: data.email,
          phone: data.phone,
          address: null,
          looking_for_job: false,
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
    } else if (data.type === UserType.EMPLOYER) {
      await this.employerService.create({
        data: {
          company_name: data.company_name,
          company_size: data.company_size,
          social_media_links: {},
          industry: {
            connect: {
              id: data.industry_id,
            },
          },
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
    } else {
      throw new HttpException('User type is not valid', HttpStatus.BAD_REQUEST);
    }

    return this.userService.getUserInfo(newUser.id);
  }

  async getUserInfo(reqUser: any) {
    const user = await this.userService.getUserInfo(reqUser.id);

    return user;
  }

  async forgotPassword() {
    return 'forgotPassword';
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.appConfig.BCRYPT_SALT);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
