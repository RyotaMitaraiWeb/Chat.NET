import { render, screen } from '@testing-library/react';
import TextField from './TextField';

describe('TextField (client)', () => {
  describe('Placeholder', () => {
    it('Displays correct placeholder when passed one and the field is required', async () => {
      render(<TextField value="a" required onChange={() => {}} placeholder="Test" />);
      await screen.findByPlaceholderText('Test*');
    });

    it('Displays correct placeholder when passed one and the field is not required', async () => {
      render(<TextField value="a" onChange={() => {}} placeholder="Test" />);
      await screen.findByPlaceholderText('Test');
    });
  });
});
