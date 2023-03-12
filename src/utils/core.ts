import { Command } from "commander";
import inquirer from "inquirer";

const program = new Command();
process.env.__KODA__ = "__KODA__";

export { inquirer, program };
