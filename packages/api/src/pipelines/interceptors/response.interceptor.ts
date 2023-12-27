import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'src/types/response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return;
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: {
            result: data.result ?? data,
            meta: data.meta,
          },
        };
      }),
    );
  }
}
