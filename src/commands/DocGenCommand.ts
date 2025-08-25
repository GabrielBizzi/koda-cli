import ora from "ora";
import { spawn } from "../utils";
import fs from "fs";
import path from "path";
import BaseCommand from "./BaseCommand";
import { success, error } from "../utils/console";

class DocGenCommand extends BaseCommand {
  constructor() {
    super({
      name: "doc:gen",
      description: "Gera documentação do projeto com TypeDoc",
      usage: "koda doc:gen [--out docs] [--json] [--entry src]",
    });
  }

  async run(...args: string[]) {
    const flags = this.parseFlags(args);
    const out = flags["--out"] || "docs";
    const isJson = flags["--json"];
    const entry: any = flags["--entry"] || "src";

    if (!fs.existsSync(path.resolve(process.cwd(), entry))) {
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

    if (isJson) argsTypedoc.push("--json", `${out}/documentation.json`);

    const spinner = ora("Gerando documentação com TypeDoc...").start();

    try {
      await spawn("npx", ["typedoc", ...argsTypedoc]);
      spinner.succeed("📘 Documentação gerada com sucesso!");
      console.log(success(`✅ Saída disponível em: ${out}`));
    } catch (e) {
      spinner.fail("❌ Falha ao gerar documentação.");
    }
  }

  parseFlags(args: string[]) {
    const flags: Record<string, string | boolean> = {};
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith("--")) {
        flags[arg] = args[i + 1]?.startsWith("--") ? true : args[i + 1] || true;
      }
    }
    return flags;
  }
}

export default DocGenCommand;
