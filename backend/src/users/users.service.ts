import { Injectable } from "@nestjs/common";
import { getSupabaseClient } from "../supabase";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const supabase = getSupabaseClient();
        // Insertar usuario en la tabla "users" de Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: createUserDto.email,
            password: createUserDto.password,
            options: {
                data: { full_name: createUserDto.fullName }
            }
        });

        if (authError) {
            console.error('Supabase Auth Error:', authError);
            throw new Error(authError.message);
        }

        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([
                {
                    id: authData.user?.id,
                    full_name: createUserDto.fullName,
                    email: createUserDto.email
                }
            ]);
        
        if (userError) {
            console.error('Supabase User Error:', userError);
            throw new Error(userError.message);
        }

        return { auth: authData, user: userData };
    }

    async login(email: string, password: string ) {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
}