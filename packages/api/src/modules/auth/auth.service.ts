import { LoginDto } from '@modules/auth/dtos/login.dto';
import { RegisterDto } from '@modules/auth/dtos/register.dto';
import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppConfig } from 'src/types/config';

@Injectable()
export class AuthService {
  private appConfig: AppConfig;  

  constructor(
    readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.appConfig = this.configService.get<AppConfig>('app');
  }

  async login(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new HttpException('Email or password is incorrect', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await this.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Email or password is incorrect', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      type: user.type,
    });

    return {
      access_token: token,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return this.userService.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: await this.hashPassword(data.password),
        type: data.type,
      },
    });
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
