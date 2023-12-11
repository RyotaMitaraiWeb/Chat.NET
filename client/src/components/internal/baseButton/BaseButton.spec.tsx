import { render } from '@testing-library/react';
import BaseButton from './BaseButton';

describe('BaseButton', () => {
  describe('Rendering as a button or link', () => {
    it('Renders as a button correctly in normal circumstances', () => {
      render(<BaseButton>Test</BaseButton>);
      const button = document.querySelector('button');
      expect(button).not.toBeNull();
    });

    it('Renders as a hyperlink when a valid href is passed', () => {
      render(<BaseButton href="/">Test</BaseButton>);
      const button = document.querySelector('a');
      expect(button).not.toBeNull();
    });

    it('Renders as a button if disabled (even if a valid href is passed)', () => {
      render(
        <BaseButton href="/" disabled>
          Test
        </BaseButton>,
      );

      const button = document.querySelector('button');
      expect(button).not.toBeNull();
    });
  });
});
