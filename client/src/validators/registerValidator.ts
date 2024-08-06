import { api } from '@/constants/api';
import { registerValidationErrorMessages } from '@/constants/validationErrorMessages/register';
import { registerValidationRules } from '@/constants/validationRules/register';
import { AuthRequest } from '@/types/auth';

export async function registerValidator(user: AuthRequest): Promise<string[]> {
  const passwordMinLength = user.password.length >= registerValidationRules.password.minLength;
  if (!passwordMinLength) {
    return [registerValidationErrorMessages.password.minLength];
  }

  const res = await fetch(api.auth.usernameExists(user.username), {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: false,
    },
  });

  if (!res.ok) {
    return [];
  } else {
    return [registerValidationErrorMessages.username.exists];
  }
}
