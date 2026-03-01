import CreateCommand from "./commands/CreateCommand";
import DocGenCommand from "./commands/DocGenCommand";
import GenerateCommand from "./commands/GenerateCommand";
import UpdateFeedCommand from "./commands/UpdateFeedCommand";
import WhoIsCommand from "./commands/WhoIsCommand";
import InfoCommand from "./commands/InfoCommand";

const commands = [
  new CreateCommand(),
  new DocGenCommand(),
  new GenerateCommand(),
  new UpdateFeedCommand(),
  new WhoIsCommand(),
  new InfoCommand(),
];

export { commands };
