import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/types/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private appConfig: AppConfig;

  constructor(
    private readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {
    this.appConfig = this.configService.get<AppConfig>('app');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.appConfig.JWT_SECRET,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const { cookies } = request;

    if (!cookies) {
      return;
    }

    const token = cookies['access_token'];

    return token;
  }
}
