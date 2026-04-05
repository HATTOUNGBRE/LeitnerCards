import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SEED_USERS } from 'src/data/data';
import { User } from '../models/user.model';

@Injectable()
export class AuthService implements OnModuleInit {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    this.users = await Promise.all(
      SEED_USERS.map(async (u) => ({
        id: u.id,
        email: u.email,
        passwordHash: await bcrypt.hash(u.password, 10),
        username: u.username,
        pseudo: u.pseudo,
      })),
    );
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = this.users.find((u) => u.email === email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }
}