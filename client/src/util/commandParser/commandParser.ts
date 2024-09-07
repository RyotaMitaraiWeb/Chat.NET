import { InvalidCommandError, MalformedCommandError } from './CommandParserErrors';
import { commandList } from './commandsList';

const baseCommandRegex = /(?<=^\/)[a-z0-9]+/i;

/**
 * This extracts information about the command into a more ergonomic format.
 *
 * @param command the command must start with a slash (``/``). Each argument
 * must be separated by a pipe (``|``), with spaces before and after the pipe
 * also being valid (thus, `` | `` is the same as ``| `` or ``|``)
 *
 * You can only use explicitly declared commands. The arguments must also pass
 * validation; the most common form of validation is the amount of arguments
 * (for example, the ban command requires exactly two arguments)
 *
 * @returns an object containing the arguments. The keys are the ones specified
 * in the ``argumentKeys`` property for the given command in the commands list.
 * The mapping happens based on the order of the argument keys and the arguments
 * in the command (for example, the first argument of the ban command will
 * go into the ``username`` property).
 *
 * @throws
 * - ``MalformedCommandError`` if the command does not follow the formatting
 * (e.g. it does not start with a slash)
 * - ``InvalidCommandError`` if the command does not exist or the arguments
 * fail validation
 */
export function commandParser(command: string): Record<string, string> {
  const baseCommand = command.match(baseCommandRegex)?.toString();
  if (!baseCommand) {
    throw new MalformedCommandError(`Malformed command: ${command}`);
  }

  const baseArgs = command.replace(`/${baseCommand} `, '');

  const commandIsAvailable = commandList[baseCommand] !== undefined;
  if (!commandIsAvailable) {
    throw new InvalidCommandError(`Command ${baseCommand} is not available`);
  }

  const cmd = commandList[baseCommand];
  const args = baseArgs.split(/\s?\|\s?/);

  const result = cmd.validateArgs ? cmd.validateArgs(args) : true;

  if (result !== true) {
    throw new InvalidCommandError(result);
  }

  const argsObj = cmd.argumentKeys.reduce(
    (state, key, index) => ({
      ...state,
      [key]: args[index],
    }),
    {},
  );

  return argsObj;
}
