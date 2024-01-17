/*
 * @Author: zwz
 * @Date: 2024-01-10 16:37:38
 * @LastEditors: zwz
 * @LastEditTime: 2024-01-17 14:27:41
 * @Description: 请填写简介
 */
import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { changeUserDto } from './dto/change-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}
  @InjectRepository(User)
  private userRepository: Repository<User>;

  private appid = 'wx17a5ae5ebd312e9d';
  private secret = '034aa6914303083d81f7dd359a6a1ce5';
  private grant_type = 'authorization_code';

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  async login(LoginUserDto: LoginUserDto) {
    const { code } = LoginUserDto;
    const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=${this.grant_type}&appid=${this.appid}&secret=${this.secret}&js_code=${code}`;
    const info = await this.getInfo(url);
    const user = await this.userRepository.findOne({
      where: {
        openid: info.data.openid,
      },
    });
    // 存在用户直接返回token
    const vo = new LoginUserVo();
    if (user) {
      // vo.openid = user.openid;
      vo.nickName = user.nickName;
      vo.accessToken = this.setToken({
        nickName: user.nickName,
        openid: user.openid,
        userid: user.id,
      });
      vo.userId = user.id;
      vo.avatar = user.avatar;
    } else {
      // 注册用户
      const newUser = new User();
      newUser.nickName = `微信用户${Math.floor(Math.random() * 100000)}`;
      newUser.openid = user.openid;
      await this.userRepository.save(newUser);
      const userRes = await this.userRepository.findOneBy({
        openid: user.openid,
      });
      vo.nickName = newUser.nickName;
      vo.accessToken = this.setToken({
        nickName: user.nickName,
        openid: newUser.openid,
        userid: userRes.id,
      });
      vo.userId = userRes.id;
      vo.avatar = newUser.avatar;
    }
    return vo;
  }
  /**
   * 实现生成token
   */
  setToken(userInfo): string {
    const token = this.jwtService.sign(
      {
        nikcName: userInfo.nickName,
        openid: userInfo.openid,
        userid: userInfo.userid,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '1d',
      },
    );
    return token;
  }

  async getInfo(url: string): Promise<AxiosResponse> {
    console.log(this.httpService.post, '11');
    return await this.httpService.post(url).toPromise();
  }

  async changeInfo(changeInfoDto: changeUserDto) {
    const fundUser = await this.userRepository.findOneBy({
      id: changeInfoDto.userid,
    });
    console.log(fundUser, 'fundUser');
    fundUser.avatar = changeInfoDto.avatar;
    fundUser.nickName = changeInfoDto.nickName;
    try {
      await this.userRepository.save(fundUser);
      const afterUserInfo = await this.userRepository.findOneBy({
        id: changeInfoDto.userid,
      });
      return {
        info: afterUserInfo,
        text: '个人信息修改成功',
      };
    } catch (e) {
      return '个人信息修改失败';
    }
  }
}
