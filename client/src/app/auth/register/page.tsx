'use client';
import Heading from '@/components/heading/Heading';
import './page.scss';
import { useState } from 'react';
import Typography from '@/components/typography/Typography';
import Link from '@/components/link/Link';
import Button from '@/components/button/Button';
import { MdLogin } from 'react-icons/md';
import AuthField from '@/features/authField/AuthField';

export default function Page() {
  const [data, setData] = useState({ username: '', password: '' });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="register">
      <Heading level={1}>Create a Chat.NET profile</Heading>
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
          />
        </div>
        <Typography>
          If you already have an account, you can sign in from the{' '}
          <Link href="/auth/login">login page</Link>.
        </Typography>
        <Button
          disabled={!data.password || !data.username}
          size="large"
          icon={<MdLogin />}
          type="submit"
          color="primary"
          className="register-button"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
