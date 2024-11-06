import { AuthRepository } from '../../core/repositories/AuthRepository';
import { User } from '../../core/entities/User';

export class SignUpUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string, displayName: string): Promise<User> {
    try {
      return await this.authRepository.signUp(email, password, displayName);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return 'An error occurred during sign up';
    }
  }
}