/*
 * @Author: zwz
 * @Date: 2024-01-15 22:15:59
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-16 08:57:54
 * @Description: 请填写简介
 */
import { IsNotEmpty } from 'class-validator';

export class changeUserDto {
  @IsNotEmpty({
    message: '头像不能为空',
  })
  avatar: string;

  @IsNotEmpty({
    message: '昵称不能为空',
  })
  nickName: string;

  @IsNotEmpty({
    message: 'userId不能为空',
  })
  userid: number;
}
