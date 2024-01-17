/*
 * @Author: zwz
 * @Date: 2024-01-14 17:29:12
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-14 17:36:36
 * @Description: 封装错误返回
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.statusCode = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    response
      .json({
        code: exception.getStatus(),
        message: 'fail',
        data: res?.message?.join ? res?.message?.join(',') : exception.message,
      })
      .end();
  }
}
