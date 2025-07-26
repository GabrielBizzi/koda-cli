import type { BaseCommand } from "./commands";
import { CreateCommand, InfoCommand } from "./commands";
import BaseCommandMultiArg from "./commands/BaseCommandOptions";
import GenerateCommand from "./commands/GenerateCommand";
import UpdateFeedCommand from "./commands/UpdateFeedCommand";
import "dotenv/config";

const CommandFactory = new Map<string, BaseCommand>();
const CommandWithArgsFactory = new Map<string, BaseCommandMultiArg>();

const createCommand = new CreateCommand();
const infoCommand = new InfoCommand();
const generateCommand = new GenerateCommand();
const updateFeedCommand = new UpdateFeedCommand();

CommandFactory.set(createCommand.getName(), createCommand);
CommandFactory.set(infoCommand.getName(), infoCommand);
CommandWithArgsFactory.set(generateCommand.getName(), generateCommand);
CommandFactory.set(updateFeedCommand.getName(), updateFeedCommand);

export { CommandFactory, CommandWithArgsFactory };
