import ora from "ora";
import { spawn } from "../utils";
import fs from "fs";
import path from "path";
import BaseCommand from "./BaseCommand";
import { success, error } from "../utils/console";
import { Command } from "commander";

interface DocGenOptions {
  out?: string;
  json?: boolean;
  entry?: string;
}

class DocGenCommand extends BaseCommand {
  constructor() {
    super({
      name: "doc:gen",
      description: "Gera documentação do projeto com TypeDoc",
      usage: "doc:gen",
    });
  }

  public register(cli: Command): void {
    cli
      .command(this.getUsage())
      .alias(this.getAlias())
      .description(this.getDescription())
      .option("--out <folder>", "Output folder (default: docs)")
      .option("--entry <path>", "Entry directory (default: src)")
      .option("--json", "Generate JSON output")
      .action(async (_: string, options: any) => {
        await this.run(undefined, options);
      });
  }

  async run(_arg?: string, options?: DocGenOptions) {
    const out = options?.out || "docs";
    const isJson = options?.json ?? false;
    const entry = options?.entry || "src";

    const entryPath = path.resolve(process.cwd(), entry);

    if (!fs.existsSync(entryPath)) {
      console.log(error(`❌ Diretório de entrada "${entry}" não encontrado.`));
      return;
    }

    const argsTypedoc = [
      entry,
      "--plugin",
      "typedoc-plugin-missing-exports",
      "--out",
      out,
    ];

    if (isJson) {
      argsTypedoc.push("--json", `${out}/documentation.json`);
    }

    const spinner = ora("Gerando documentação com TypeDoc...").start();

    try {
      await spawn("npx", ["typedoc", ...argsTypedoc]);
      spinner.succeed("📘 Documentação gerada com sucesso!");
      console.log(success(`✅ Saída disponível em: ${out}`));
    } catch {
      spinner.fail("❌ Falha ao gerar documentação.");
    }
  }
}

export default DocGenCommand;
