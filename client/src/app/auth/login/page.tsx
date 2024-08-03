import Heading from '@/components/heading/Heading';
import '../page.scss';
import AuthForm from '@/features/auth/AuthForm/AuthForm';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="auth-page">
      <Heading level={1} className="auth-heading">
        Log in to your Chat.NET profile
      </Heading>
      <Suspense fallback={<h1>LOADING</h1>}>
        <AuthForm page="login" />
      </Suspense>
    </div>
  );
}
