const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const clientApiUrl = process.env.NEXT_PUBLIC_CLIENT_COMPONENTS_API_URL;
const auth = `${clientApiUrl}/auth`;
const chat = `${apiUrl}/chat`;

export const api = {
  auth: {
    register: `${auth}/register`,
    login: `${auth}/login`,
    usernameExists: (username: string) => `${auth}/username-exists/${username}`,
  },
  chat: {
    get: (id: string | number) => `${chat}/${id}`,
    create: chat,
    update: (id: string | number) => `${chat}/${id}`,
    delete: (id: string | number) => `${chat}/${id}`,
    search: chat,
  },
};
