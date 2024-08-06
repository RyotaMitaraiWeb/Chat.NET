const apiUrl = 'http://localhost:5000';
const auth = `${apiUrl}/auth`;

export const api = {
  auth: {
    register: `${auth}/register`,
    login: `${auth}/login`,
    usernameExists: (username: string) => `/auth/username-exists/${username}`,
  },
};
