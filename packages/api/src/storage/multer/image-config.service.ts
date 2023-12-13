import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

@Injectable()
export class ImageConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(
            null,
            `${randomName}-${file.fieldname}.${file.originalname
              .split('.')
              .pop()}`,
          );
        },
      }),
    };
  }
}
