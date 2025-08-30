import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private users: User[] = [];

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id: Date.now(), email, password: hashedPassword };

    this.users.push(user);

    return { message: 'Successfully registered', UserId: user.id };
  }
}
