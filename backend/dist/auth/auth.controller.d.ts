import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register({ email, password }: {
        email: any;
        password: any;
    }): Promise<any[]>;
    login({ email, password }: {
        email: any;
        password: any;
    }): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    }>;
    getUser(email: any): Promise<any[]>;
}
