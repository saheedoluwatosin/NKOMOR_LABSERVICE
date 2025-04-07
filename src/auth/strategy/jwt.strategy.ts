import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from './auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'Jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'DGDHGDBDB@HDGVDBD123432JDJDUDDBDEHUENDDBDD'
      })
  }

  async validate(payload: any) {
    console.log(payload);
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}