import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { error } from "../utils";
import Spinner from "../utils/loader";
import BaseCommand from "./BaseCommand";
import { Command } from "commander";

const spinner = new Spinner().spinner;

interface CreateFlags {
  template?: string;
  code?: string;
}

class CreateCommand extends BaseCommand {
  constructor() {
    super({
      name: "create",
      description: "...",
      usage: "create <projectName>",
    });
  }

  public register(cli: Command): void {
    cli
      .command(this.getUsage())
      .alias(this.getAlias())
      .description(this.getDescription())
      .requiredOption("--template <template>", "Template name")
      .requiredOption("--code <code>", "System code")
      .action(async (projectName: string, options: CreateFlags) => {
        await this.run(projectName, options);
      });
  }

  public async run(projectName?: string, flags?: CreateFlags): Promise<void> {
    try {
      if (!projectName) {
        throw new Error("Project name is required.");
      }

      await this.createFromTemplate(
        flags!.template as string,
        projectName,
        flags!.code as string,
      );
    } catch (err: any) {
      spinner.fail(error(err.message));
      spinner.stop();
    }
  }

  private async createFromTemplate(
    template: string,
    projectName: string,
    systemCode: string,
  ) {
    const targetPath = path.resolve(process.cwd(), projectName);
    const templatePath = path.resolve(__dirname, "..", "templates", template);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${template}" not found.`);
    }

    if (fs.existsSync(targetPath)) {
      throw new Error(`Folder "${projectName}" already exists.`);
    }

    spinner.start(`Creating project "${projectName}"...\n`);

    fs.cpSync(templatePath, targetPath, { recursive: true });
    this.replaceSystemCode(targetPath, systemCode);
    this.updatePackageName(targetPath, projectName);

    spinner.text = "Ensuring pnpm is installed...";
    this.ensurePnpm();

    spinner.text = "Installing dependencies with pnpm...";
    this.installDependencies(targetPath);

    spinner.succeed("Project created successfully 🚀");
    spinner.stop();
  }

  private replaceSystemCode(folder: string, code: string) {
    const walk = (dir: string) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          walk(fullPath);
        } else {
          const content = fs.readFileSync(fullPath, "utf8");

          if (content.includes("__SYSTEM_CODE__")) {
            const updated = content.replace(/"__SYSTEM_CODE__"/g, code);
            fs.writeFileSync(fullPath, updated, "utf8");
          }
        }
      }
    };

    walk(folder);
  }

  private updatePackageName(projectPath: string, projectName: string) {
    const packageJsonPath = path.join(projectPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) return;

    const sanitizedName = projectName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.name = sanitizedName;

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8",
    );
  }

  private ensurePnpm() {
    try {
      execSync("pnpm -v", { stdio: "ignore" });
    } catch {
      execSync("npm install -g pnpm", { stdio: "inherit" });
    }
  }

  private installDependencies(projectPath: string) {
    execSync("pnpm install", {
      cwd: projectPath,
      stdio: "inherit",
    });
  }
}

export default CreateCommand;
