/*
 * @Author: zwz
 * @Date: 2024-01-10 16:31:27
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-17 09:50:32
 * @Description: 请填写简介
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { CustomExceptionFilter } from './custom-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // dto 参数校验
  app.useGlobalInterceptors(new FormatResponseInterceptor()); // 返回参数封装
  app.useGlobalInterceptors(new InvokeRecordInterceptor()); // 日志封装
  app.useGlobalFilters(new UnloginFilter()); // 未登录统一返回格式
  app.useGlobalFilters(new CustomExceptionFilter()); // 错误统一返回
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  app.enableCors();
  await app.listen(3008);
}
bootstrap();
