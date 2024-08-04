import Heading from '@/components/heading/Heading';
import '../page.scss';
import AuthForm from '@/features/auth/AuthForm/AuthForm';
import { Suspense } from 'react';
import Loader from '@/components/loader/Loader';

export default function Page() {
  return (
    <div className="auth-page">
      <Heading level={1} className="auth-heading">
        Log in to your Chat.NET profile
      </Heading>
      <Suspense
        fallback={
          <Loader color="primary" size="large" text="Loading the form, please wait a moment!" />
        }
      >
        <AuthForm page="login" />
      </Suspense>
    </div>
  );
}
