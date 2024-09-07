import { commandParser } from './commandParser';
import { InvalidCommandError, MalformedCommandError } from './CommandParserErrors';

describe('commandParser', () => {
  describe('Ban', () => {
    it('Returns an object with username and reason when successful', () => {
      const result = commandParser('/ban ryota1 | some reason');
      expect(result.username).toBe('ryota1');
    });

    it('Throws an InvalidCommandException if less than two arguments are provided', () => {
      expect(() => commandParser('/ban ryota1')).toThrow(InvalidCommandError);
    });

    it('Throws an InvalidCommandException if more than two arguments are provided', () => {
      expect(() => commandParser('/ban ryota1 | reason | third arg')).toThrow(InvalidCommandError);
    });
  });

  describe('Warn', () => {
    it('Returns an object with username and reason when successful', () => {
      const result = commandParser('/warn ryota1 | some reason');
      expect(result.username).toBe('ryota1');
    });

    it('Throws an InvalidCommandException if less than two arguments are provided', () => {
      expect(() => commandParser('/warn ryota1')).toThrow(InvalidCommandError);
    });

    it('Throws an InvalidCommandException if more than two arguments are provided', () => {
      expect(() => commandParser('/warn ryota1 | reason | third arg')).toThrow(InvalidCommandError);
    });
  });

  describe('Unban', () => {
    it('Returns an object with username and reason when successful', () => {
      const result = commandParser('/unban ryota1');
      expect(result.username).toBe('ryota1');
    });

    it('Throws an InvalidCommandException if no arguments are provided', () => {
      expect(() => commandParser('/warn')).toThrow(InvalidCommandError);
    });

    it('Throws an InvalidCommandException if more than one argument is provided', () => {
      expect(() => commandParser('/unban ryota1 | reason')).toThrow(InvalidCommandError);
    });
  });

  describe('General errors', () => {
    it('Throws an InvalidCommandException if the command does not exist', () => {
      expect(() => commandParser('/janitor a ')).toThrow(InvalidCommandError);
    });

    it('Throws a MalformedCommandException if the command does not match the formatting', () => {
      expect(() => commandParser('ban a | b')).toThrow(MalformedCommandError);
    });
  });
});
