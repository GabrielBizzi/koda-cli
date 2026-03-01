#!/usr/bin/env node

import { program as cli } from "./utils";
import { commands } from "./index";

commands.forEach((command) => {
  command.register(cli);
});

cli.parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp();
}
