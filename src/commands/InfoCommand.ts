import { Command } from "commander";
import { envinfo, error, success, info } from "../utils";
import Spinner from "../utils/loader";
import BaseCommand from "./BaseCommand";
import fs from "fs";
import path from "path";
import os from "os";

class InfoCommand extends BaseCommand {
  constructor() {
    super({
      name: "info",
      description: "Exibe informações detalhadas do ambiente",
      usage: "info",
    });
  }

  public register(cli: Command): void {
    cli
      .command(this.getUsage())
      .alias(this.getAlias())
      .description(this.getDescription())
      .option("--json", "Retorna saída em JSON")
      .option("--minimal", "Mostra apenas informações essenciais")
      .action(async (_: string, options: any) => {
        await this.run(undefined, options);
      });
  }

  public async run(
    _arg?: string,
    options?: { json?: boolean; minimal?: boolean },
  ): Promise<void> {
    const spinner = new Spinner().spinner;
    spinner.start("🔎 Coletando informações do ambiente...\n");

    try {
      const packagePath = path.resolve(process.cwd(), "package.json");

      let projectInfo: any = null;
      if (fs.existsSync(packagePath)) {
        const pkg = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
        projectInfo = {
          name: pkg.name,
          version: pkg.version,
          packageManager:
            pkg.packageManager ||
            (fs.existsSync("pnpm-lock.yaml")
              ? "pnpm"
              : fs.existsSync("yarn.lock")
                ? "yarn"
                : "npm"),
        };
      }

      const basicInfo = {
        cliVersion: this.getCliVersion(),
        nodeVersion: process.version,
        platform: os.platform(),
        arch: os.arch(),
        nodeEnv: process.env.NODE_ENV || "undefined",
        project: projectInfo,
      };

      if (options?.minimal) {
        spinner.succeed("✅ Ambiente analisado\n");
        console.log(basicInfo);
        return;
      }

      const env = await envinfo.run(
        {
          System: ["OS", "CPU", "Memory"],
          Binaries: ["Node", "pnpm", "Yarn", "npm"],
          Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
          npmPackages: "/**/{typescript,*react*,@koda-dev/*/}",
          npmGlobalPackages: ["@koda-dev/koda-cli"],
        },
        {
          showNotFound: true,
          duplicates: false,
          fullTree: false,
        },
      );

      spinner.succeed("✅ Ambiente analisado\n");

      if (options?.json) {
        console.log(
          JSON.stringify(
            {
              basic: basicInfo,
              detailed: env,
            },
            null,
            2,
          ),
        );
        return;
      }

      console.log(info("📦 CLI"));
      console.log(`  Version: ${basicInfo.cliVersion}`);
      console.log("");

      if (projectInfo) {
        console.log(info("📁 Projeto"));
        console.log(`  Name: ${projectInfo.name}`);
        console.log(`  Version: ${projectInfo.version}`);
        console.log(`  Package Manager: ${projectInfo.packageManager}`);
        console.log("");
      }

      console.log(info("🧠 Runtime"));
      console.log(`  Node: ${basicInfo.nodeVersion}`);
      console.log(`  Platform: ${basicInfo.platform}`);
      console.log(`  Arch: ${basicInfo.arch}`);
      console.log(`  NODE_ENV: ${basicInfo.nodeEnv}`);
      console.log("");

      console.log(success("🔍 Detalhado"));
      console.log(env);
    } catch (err: any) {
      spinner.fail(
        error(`❌ Falha ao coletar informações:\n\n${err?.message ?? err}`),
      );
    }
  }

  private getCliVersion(): string {
    try {
      const pkgPath = path.resolve(__dirname, "../../package.json");
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      return pkg.version;
    } catch {
      return "unknown";
    }
  }
}

export default InfoCommand;
