import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
export declare class AuthenticationService {
    create(createAuthenticationDto: CreateAuthenticationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthenticationDto: UpdateAuthenticationDto): string;
    remove(id: number): string;
}
