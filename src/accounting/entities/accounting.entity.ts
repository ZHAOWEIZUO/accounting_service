/*
 * @Author: zwz
 * @Date: 2024-01-17 14:56:49
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-17 15:05:36
 * @Description: 请填写简介
 */
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accounting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'record_time',
    comment: '记录时间',
  })
  recordTime: Date;

  @Column({
    name: 'amount',
    comment: '金额',
  })
  amount: string;

  @Column({
    name: 'purposes',
    comment: '用途',
  })
  purposes: string;

  @Column({
    name: 'remark',
    comment: '备注',
  })
  remark: string;

  @ManyToOne(() => User)
  user: User;
}
