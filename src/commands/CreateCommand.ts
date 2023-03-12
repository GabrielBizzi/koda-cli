import { error, info, inquirer, spawn } from "../utils";
import Spinner from "../utils/loader";
import BaseCommand from "./BaseCommand";
import { exec } from "child_process";
import path, { resolve } from "path";
import process from "process";

interface Action {
  name: string;
  value: string;
  disabled?: boolean;
  command: string;
  args: string[];
}

const spinner = new Spinner().spinner;

class CreateCommand extends BaseCommand {
  static readonly TemplateActions: Action[] = [
    {
      name: "React TSX - Standard",
      value: "tsx",
      command: "npx",
      args: [
        "create-react-app",
        "--template",
        "bizzi-standard-react-typescript",
      ],
    },
    // {
    //   name: "React TSX - Standard",
    //   value: "simple",
    //   command: "git",
    //   args: [
    //     "clone",
    //     "--depth=1",
    //     "https://github.com/sabertazimi/boilerplate",
    //   ],
    // },
    // {
    //   name: "React JSX - Standard",
    //   value: "jsx",
    //   disabled: true,
    //   command: "npx",
    //   args: [
    //     "create-react-app@latest",
    //     "--template",
    //     "bizzi-standard-react-typescript",
    //   ],
    // },
    // {
    //   name: "React TSX - Standard",
    //   value: "tsx",
    //   disabled: true,
    //   command: "npx",
    //   args: [
    //     "create-react-app@latest",
    //     "--template",
    //     "bizzi-standard-react-typescript",
    //   ],
    // },
    // {
    //   name: "React Framework",
    //   value: "framework",
    //   disabled: true,
    //   command: "npx",
    //   args: ["create-react-app@latest", "--template", "bod"],
    // },
  ];

  private command = "npx";
  private commandArgs: string[] = [];
  private nameApp: string = "";

  constructor() {
    super({
      name: "create",
      description: "Create a new project powered by @blitzcorvinato/react-koda",
      usage: "create <appName>",
    });
  }

  public async run(appName: string): Promise<void> {
    await this.processTemplateAction();
    this.nameApp = appName;
    this.resolveAppPath(appName);
    this.execute();
  }

  public getCommand(): string {
    return this.command;
  }

  public getCommandArgs(): string[] {
    return this.commandArgs;
  }

  private async processTemplateAction(): Promise<void> {
    const { templateName } = await inquirer.prompt([
      {
        name: "templateName",
        type: "list",
        message: "Select template:",
        choices: [...CreateCommand.TemplateActions],
      },
    ]);

    const { command, args } = CreateCommand.TemplateActions.find(
      ({ value }) => value === templateName
    ) as Action;

    this.command = command;
    this.commandArgs = [...args];
  }

  private resolveAppPath(appName: string): void {
    this.commandArgs.push(appName);
  }

  private execute(): void {
    spinner.start(`Creating the ${this.nameApp} project...\n`);

    const proc = spawn.sync(this.command, this.commandArgs, {
      stdio: "ignore",
    });

    if (proc.status !== 0) {
      spinner.fail(
        error(
          `Could not create project!\n The last thing I saw was ...\n\n${
            this.command
          } ${this.commandArgs.join(" ")}\` exited.`
        )
      );
    } else {
      spinner.text = "Project created, removing optional dependencies...";
      spinner.stop();

      switch (this.commandArgs[0]) {
        case "create-react-app":
          exec(
            `cd ${this.nameApp} && npm uninstall react-scripts`,
            (errorStdout, stdout, stderr) => {
              if (errorStdout) {
                console.log(error(stderr));
                spinner.stop();

                return;
              }
              if (stderr) {
                spinner.fail(
                  error(`Could not remove the vulnerabilities on the project!`)
                );
                spinner.stop();
              }

              spinner.succeed(
                "The project was created successfully with 0 vulnerabilities!"
              );
              spinner.stop();

              return;
            }
          );
          break;
      }
    }
  }
}

export type { Action };
export default CreateCommand;
