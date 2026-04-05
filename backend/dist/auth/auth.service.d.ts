import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService implements OnModuleInit {
    private readonly jwtService;
    private users;
    constructor(jwtService: JwtService);
    onModuleInit(): Promise<void>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
