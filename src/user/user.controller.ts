/*
 * @Author: zwz
 * @Date: 2024-01-10 16:37:38
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-17 14:29:47
 * @Description: 请填写简介
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { changeUserDto } from './dto/change-user.dto';
import { RequireLogin } from 'src/custom.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storage } from 'src/my-file-storage';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Post('/login')
  async login(@Body() LoginUserDto: LoginUserDto) {
    const user = await this.userService.login(LoginUserDto);
    return user;
  }

  /**
   * 上传图片
   * @param file
   * @returns
   */

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif', '.jpeg'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() fail: Express.Multer.File) {
    return fail.path;
  }

  /**
   * 修改用户信息 需要登录
   * @param changeInfoDto
   * @returns
   */
  @RequireLogin()
  @Post('/changeInfo')
  async changeInfo(@Body() changeInfoDto: changeUserDto) {
    console.log(changeInfoDto);
    const res = await this.userService.changeInfo(changeInfoDto);
    return res;
  }
}
