/*
 * @Author: zwz
 * @Date: 2024-01-14 16:42:49
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-16 10:36:50
 * @Description: 请填写简介
 */
import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const RequireLogin = () => SetMetadata('require-login', true);

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) {
      return null;
    }
    return data ? request.user[data] : request.user;
  },
);
