'use client';
import Radio from '@/components/radio/Radio';
import './ChangeAnimationsPreference.scss';
import Button from '@/components/button/Button';
import { useState } from 'react';

const preferences = [
  {
    value: 'system',
    label: 'System (chooses a preference based on your OS settings)',
  },
  {
    value: 'on',
    label: 'Turn animations on',
  },
  {
    value: 'off',
    label: 'Turn animations off',
  },
];

function ChangeAnimationsPreference(props: { preference: string }): React.JSX.Element {
  const [preference, setPreference] = useState(props.preference);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch('/api/settings/animations', {
      method: 'post',
      body: JSON.stringify({ animation: preference }),
    });

    document.body.classList.remove(...preferences.map((p) => `animations-${p.value}`));
    document.body.classList.add(`animations-${preference}`);
  }

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="change-animations-form">
        {preferences.map((t) => (
          <Radio
            defaultChecked={preference === t.value}
            side="right"
            name="preference"
            value={t.value}
            key={t.value}
            className="theme-option"
            onChange={() => setPreference(t.value)}
          >
            {t.label}
          </Radio>
        ))}
      </div>
      <Button type="submit" color="secondary">
        Change animations preference
      </Button>
    </form>
  );
}

export default ChangeAnimationsPreference;
