import { AuthRepository } from '../../core/repositories/AuthRepository';
import { User } from '../../core/entities/User';

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    try {
      return await this.authRepository.signIn(email, password);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/invalid-email':
        return 'Invalid email address';
      default:
        return 'An error occurred during sign in';
    }
  }
}