/*
 * @Author: zwz
 * @Date: 2023-12-19 21:45:03
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-14 15:33:43
 * @Description: 请填写简介
 */
// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  // @IsNotEmpty({
  //   message: '用户名不能为空',
  // })
  // iv: string;

  // // @IsNotEmpty({
  // //   message: '密码不能为空',
  // // })
  // encryptedData: string;

  @IsNotEmpty({
    message: 'code不能为空',
  })
  code: string;
}
