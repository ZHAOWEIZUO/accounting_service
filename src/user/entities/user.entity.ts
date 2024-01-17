/*
 * @Author: zwz
 * @Date: 2024-01-10 16:37:38
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-12 14:59:23
 * @Description: 请填写简介
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    name: 'nick_name',
    comment: '昵称',
  })
  nickName: string;

  @Column({
    name: 'avatar',
    comment: '头像',
    default: null,
  })
  avatar: string;

  @Column({
    name: 'gender',
    comment: '性别',
    default: null,
  })
  gender: number;

  @Column({
    name: 'openid',
    comment: 'openid',
  })
  openid: string;

  @Column({
    comment: '手机号',
    length: 20,
    nullable: true,
    default: null,
  })
  mobile: string;
}
