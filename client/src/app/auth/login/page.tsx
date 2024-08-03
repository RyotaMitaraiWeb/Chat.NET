import Heading from '@/components/heading/Heading';
import '../page.scss';
import AuthForm from '@/features/auth/AuthForm/AuthForm';

export default function Page() {
  return (
    <div className="auth-page">
      <Heading level={1} className="auth-heading">
        Log in to your Chat.NET profile
      </Heading>
      <AuthForm page="login" />
    </div>
  );
}
