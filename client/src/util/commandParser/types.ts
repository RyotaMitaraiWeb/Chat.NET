export type CommandParserResult<T extends never[]> = {
  command: string;
  args: T;
};

export type CommandsList = {
  command: string;
  validateArgs?: (args: string[]) => CommandListValidationResult;
  argumentKeys: string[];
};

type CommandListValidationResult = true | string;
