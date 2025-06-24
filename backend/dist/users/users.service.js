"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_1 = require("../supabase");
let UsersService = class UsersService {
    async create(createUserDto) {
        const supabase = (0, supabase_1.getSupabaseClient)();
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
    async login(email, password) {
        const supabase = (0, supabase_1.getSupabaseClient)();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map