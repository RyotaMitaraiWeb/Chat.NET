'use client';
import Button from '@/components/button/Button';
import Typography from '@/components/typography/Typography';
import { api } from '@/constants/api';
import { AuthRequest, AuthResponse } from '@/types/auth';
import Link from '@/components/link/Link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { MdLogin } from 'react-icons/md';
import AuthField from '../AuthField';
import './AuthForm.scss';
import { useSnackbar } from '@/hooks/useSnackbar/useSnackbar';
import { snackbarMessages } from '@/constants/snackbarMessages';
import { authService } from '@/services/authService';
import { SessionContext } from '@/context/session/SessionContext';

type AuthFormProps = {
  page: 'login' | 'register';
};

function AuthForm(props: AuthFormProps): React.JSX.Element {
  const [data, setData] = useState<AuthRequest>({ username: '', password: '' });
  const router = useRouter();

  const { setUser } = use(SessionContext);

  const snackbar = useSnackbar();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch(api.auth[props.page], {
      body: JSON.stringify(data),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data: AuthResponse = await res.json();
      authService.startSession(setUser);
      localStorage.setItem('access_token', data.token);

      snackbar.success(snackbarMessages.success[props.page], 10_000);

      router.push('/');

      authService.startSession(setUser);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="fields">
        <AuthField
          label="Username"
          value={data.username}
          onChange={(username) => setData({ ...data, username })}
        />
        <AuthField
          label="Username"
          value={data.password}
          onChange={(password) => setData({ ...data, password })}
          type="password"
        />
      </div>

      {props.page === 'register' ? (
        <Typography className="hint">
          If you already have an account, you can sign in from the{' '}
          <Link href="/auth/login">login page</Link>.
        </Typography>
      ) : (
        <Typography className="hint">
          If you do not have an account, you can <Link href="/auth/login">register for free</Link>.
        </Typography>
      )}
      <Button
        disabled={!data.password || !data.username}
        size="large"
        icon={<MdLogin />}
        type="submit"
        color="primary"
        className="auth-button"
      >
        {props.page === 'login' ? 'Sign in' : 'Sign up'}
      </Button>
    </form>
  );
}

export default AuthForm;
