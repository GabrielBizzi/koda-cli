#!/usr/bin/env node

import { resolve } from "path";
import { readFileSync } from "fs";
import chalk from "chalk";
import { color, info, level, program as cli } from "./utils";
import { CommandFactory, CommandWithArgsFactory } from "./index";

chalk.level = 1;

const pkg: File.Package = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf8")
);

for (const command of CommandFactory.values()) {
  cli
    .command(command.getUsage())
    .alias(command.getAlias())
    .description(command.getDescription())
    .action(async (appName: string) => {
      try {
        await command.run(appName);
      } catch (error) {
        console.log(error);
        cli.outputHelp();
      }
    });
}

for (const command of CommandWithArgsFactory.values()) {
  cli
    .command(command.getUsage())
    .alias(command.getAlias())
    .description(command.getDescription())
    .action(async (...args: string[]) => {
      try {
        await command.run(...args);
      } catch (error) {
        console.log(error);
        cli.outputHelp();
      }
    });
}

// add some useful info on help
cli.on("--help", () => {
  console.log("");
  console.log(
    `${info("[i]")} Run ${color.cyan(
      `koda <command> --help`
    )} for detailed usage of given command.`
  );
  console.log("");
});

cli.showHelpAfterError();
cli.parse(process.argv);

// cli.addCommand()

if (!process.argv.slice(2).length) {
  cli.outputHelp();
}
