/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private users = [
    {
      username: 'test',
      password: '$2b$10$hJZj.2zHqPObZz3x/D7oY.2/51Go9oayYfciOsk.UdZ4VCCjJydD2', 
    },
  ];

  async login(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
