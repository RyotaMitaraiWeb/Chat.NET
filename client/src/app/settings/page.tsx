import Heading from '@/components/heading/Heading';
import Typography from '@/components/typography/Typography';
import ChangeTheme from '../../features/changeTheme/ChangeTheme';
import { cookies } from 'next/headers';

export default function Page() {
  const cookie = cookies();
  const defaultTheme = cookie.get('theme')?.value || 'system';
  return (
    <>
      <Heading level={1}>Settings</Heading>
      <Typography>
        <strong>Note:</strong> settings are stored per device and not per profile
      </Typography>
      <section>
        <Heading level={2}>Change theme</Heading>
        <ChangeTheme theme={defaultTheme} />
      </section>
    </>
  );
}
