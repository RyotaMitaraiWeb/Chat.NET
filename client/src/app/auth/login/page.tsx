'use client';
import Heading from '@/components/heading/Heading';
import '../page.scss';
import { useState } from 'react';
import Typography from '@/components/typography/Typography';
import Link from '@/components/link/Link';
import Button from '@/components/button/Button';
import { MdLogin } from 'react-icons/md';
import AuthField from '@/features/authField/AuthField';
import { api } from '@/constants/api';
import { useRouter } from 'next/navigation';
import { type AuthRequest, type AuthResponse } from '@/types/auth';

export default function Page() {
  const [data, setData] = useState<AuthRequest>({ username: '', password: '' });
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch(api.auth.login, {
      body: JSON.stringify(data),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data: AuthResponse = await res.json();
      localStorage.setItem('access_token', data.token);
      router.push('/');
    }
  }

  return (
    <div className="register">
      <Heading level={1}>Log in to your Chat.NET profile</Heading>
      <form onSubmit={handleSubmit} className="register-form">
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
        <Typography className="hint">
          If you do not have an account, you can <Link href="/auth/login">register for free</Link>.
        </Typography>
        <Button
          disabled={!data.password || !data.username}
          size="large"
          icon={<MdLogin />}
          type="submit"
          color="primary"
          className="register-button"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
