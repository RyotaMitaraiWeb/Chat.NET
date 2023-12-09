import { render, screen } from '@testing-library/react';
import TextField from './TextField';

describe('TextField (server)', () => {
  describe('Placeholder', () => {
    it('Displays correct placeholder when passed one', async () => {
      render(<TextField placeholder="Test" />);
      await screen.findByPlaceholderText('Test*');
    });
  });
});
