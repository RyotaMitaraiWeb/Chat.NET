import Heading from '@/components/heading/Heading';
import '../page.scss';
import AuthForm from '@/features/auth/AuthForm/AuthForm';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="auth-page">
      <Heading className="auth-heading" level={1}>
        Create a Chat.NET profile
      </Heading>
      <Suspense fallback={<h1>Loading</h1>}>
        <AuthForm page="register" />
      </Suspense>
    </div>
  );
}
