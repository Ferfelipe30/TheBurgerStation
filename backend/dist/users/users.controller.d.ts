import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        auth: {
            user: import("@supabase/auth-js").User | null;
            session: import("@supabase/auth-js").Session | null;
        };
        user: null;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    }>;
}
