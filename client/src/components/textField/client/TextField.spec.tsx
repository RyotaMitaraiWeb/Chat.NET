import { render, screen } from '@testing-library/react';
import TextField from './TextField';

describe('TextField (client)', () => {
  describe('Placeholder', () => {
    it('Displays correct placeholder when passed one', async () => {
      render(<TextField value="a" onChange={() => {}} placeholder="Test" />);
      await screen.findByPlaceholderText('Test*');
    });
  });
});
