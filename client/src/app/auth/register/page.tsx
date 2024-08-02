'use client';
import Heading from '@/components/heading/Heading';
import './page.scss';
import TextField from '@/components/textField/client/TextField';
import { useState } from 'react';
import Typography from '@/components/typography/Typography';
import Link from '@/components/link/Link';
import Button from '@/components/button/Button';
import { MdLogin } from 'react-icons/md';

export default function Page() {
  const [data, setData] = useState({ username: '', password: '' });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="register">
      <Heading level={1}>Create a Chat.NET profile</Heading>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <TextField
            label="Username"
            value={data.username}
            onChange={(e) => {
              e.preventDefault();
              setData({ ...data, username: e.target.value });
            }}
            helperText={`(${data.username.length} / 500)`}
          />
          <TextField
            label="Password"
            value={data.password}
            onChange={(e) => {
              e.preventDefault();
              setData({ ...data, password: e.target.value });
            }}
            helperText={`(${data.username.length} / 500)`}
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
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
