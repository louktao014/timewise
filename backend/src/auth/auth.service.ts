import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(email, password) {
    const {
      data: authData,
      error: signUpError,
    } = await this.supabaseService.getClient().auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      throw new BadRequestException(signUpError.message);
    }

    if (!authData.user) {
        throw new InternalServerErrorException('Registration failed: user data not available after sign up.');
    }

    const { data: insertedData, error: insertError } = await this.supabaseService
      .getClient()
      .from('users')
      .insert([{ id: authData.user.id, email: authData.user.email }])
      .select();
    
    if (insertError) {
        throw new InternalServerErrorException(`Failed to save user to database: ${insertError.message}`);
    }

    return insertedData;
  }

  async login(email, password) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email,
        password,
      });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async getUser(email) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('email', email);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
}
