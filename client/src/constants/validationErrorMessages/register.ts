import { registerValidationRules } from '../validationRules/register';

export const registerValidationErrorMessages = {
  password: {
    minLength: `The password must be at least
    ${registerValidationRules.password.minLength} characters long`,
  },
  username: {
    exists: 'The username already exists, please try something else',
  },
};
