import { UserService } from '@modules/user/user.service';
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AuthGuard } from 'src/pipelines/guard/auth.guard';

@Controller('me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async updateUserInfo(@Req() req: Request, @Body() payload: any) {
    const reqUser = req['user'];

    return this.userService.updateUserInfo(reqUser, payload);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(AuthGuard)
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const reqUser = req['user'];

    return this.userService.uploadAndUpdateAvatar(reqUser, file);
  }
}
