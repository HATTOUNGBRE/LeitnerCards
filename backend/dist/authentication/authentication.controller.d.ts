import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    create(createAuthenticationDto: CreateAuthenticationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthenticationDto: UpdateAuthenticationDto): string;
    remove(id: string): string;
}
