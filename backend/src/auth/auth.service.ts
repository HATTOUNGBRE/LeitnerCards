import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

interface User {
  id: string;
  email: string;
  passwordHash: string;
}

// Utilisateurs en dur — pas de BDD
const SEED_USERS = [
  { id: '1',email: 'test@mail.com', password: 'password'},
  { id: '2', email: 'john@mail.com', password: 'password',},
  { id: '3', email: 'shantal@mail.com', password: 'password'}
];

@Injectable()
export class AuthService implements OnModuleInit {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit(): Promise<void> {
    this.users = await Promise.all(
      SEED_USERS.map(async (u) => ({
        id: u.id,
        email: u.email,
        passwordHash: await bcrypt.hash(u.password, 10),
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