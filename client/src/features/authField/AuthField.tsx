'use client';

import { ExtraSmallScreen, LargeScreen } from '@/components/screen/Screen';
import TextField from '@/components/textField/client/TextField';

type RegisterFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: 'text' | 'password';
};

function AuthField(props: RegisterFieldProps): React.JSX.Element {
  const type = props.type || 'text';

  return (
    <>
      <ExtraSmallScreen to="large">
        <TextField
          label={props.label}
          value={props.value}
          className="auth-field"
          onChange={(e) => {
            e.preventDefault();
            props.onChange(e.target.value);
          }}
          helperText={`(${props.value.length} / 500)`}
          type={type}
        />
      </ExtraSmallScreen>
      <LargeScreen>
        <TextField
          label={props.label}
          size="large"
          value={props.value}
          className="auth-field"
          onChange={(e) => {
            e.preventDefault();
            props.onChange(e.target.value);
          }}
          helperText={`(${props.value.length} / 500)`}
          type={type}
        />
      </LargeScreen>
    </>
  );
}

export default AuthField;
