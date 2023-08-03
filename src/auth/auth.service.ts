import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './dtos/register.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    console.log(user);
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async register(input: RegisterInput): Promise<User> {
    input.password = await bcrypt.hash(input.password, 10);
    return this.userService.create(input);
  }
}
