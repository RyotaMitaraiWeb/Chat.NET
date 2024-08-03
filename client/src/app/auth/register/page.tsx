import Heading from '@/components/heading/Heading';
import '../page.scss';
import AuthForm from '@/features/auth/AuthForm/AuthForm';

export default function Page() {
  return (
    <div className="auth-page">
      <Heading className="auth-heading" level={1}>
        Create a Chat.NET profile
      </Heading>
      <AuthForm page="register" />
    </div>
  );
}
