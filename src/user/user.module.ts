/*
 * @Author: zwz
 * @Date: 2024-01-10 16:37:38
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-17 15:08:13
 * @Description: 请填写简介
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { of } from 'rxjs';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
