'use client';
import Radio from '@/components/radio/Radio';
import './ChangeTheme.scss';
import Button from '@/components/button/Button';
import { useState } from 'react';

const themes = [
  {
    value: 'system',
    label: 'System (chooses a theme based on your OS settings)',
  },
  {
    value: 'light',
    label: 'Light mode',
  },
  {
    value: 'dark',
    label: 'Dark mode',
  },
];

function ChangeTheme(props: { theme: string }): React.JSX.Element {
  const [theme, setTheme] = useState(props.theme);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch('/api/settings/theme', { method: 'post', body: JSON.stringify({ theme }) });

    document.body.classList.remove('light', 'dark', 'system');
    document.body.classList.add(theme);
  }

  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="change-theme-form">
        {themes.map((t) => (
          <Radio
            defaultChecked={theme === t.value}
            side="right"
            name="theme"
            value={t.value}
            key={t.value}
            className="theme-option"
            onChange={() => setTheme(t.value)}
          >
            {t.label}
          </Radio>
        ))}
      </div>
      <Button type="submit" color="secondary">
        Change theme
      </Button>
    </form>
  );
}

export default ChangeTheme;
