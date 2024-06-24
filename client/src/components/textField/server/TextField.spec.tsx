import { render, screen } from '@testing-library/react';
import TextField from './TextField';

describe('TextField (server)', () => {
  describe('Placeholder', () => {
    it('Displays correct placeholder when passed one and the field is required', async () => {
      render(<TextField placeholder="Test" required />);
      await screen.findByPlaceholderText('Test*');
    });

    it('Displays correct placeholder when passed one and the field is not required', async () => {
      render(<TextField placeholder="Test" />);
      await screen.findByPlaceholderText('Test');
    });
  });
});
