import BaseCommand from "./BaseCommand";
import { Project, SyntaxKind } from "ts-morph";
import path from "path";
import { success, error } from "../utils/console";
import fs from "fs";
import ora from "ora";

class WhoIsCommand extends BaseCommand {
  constructor() {
    super({
      name: "whois",
      description: "Encontra onde determinado identificador é usado",
      usage: "koda whois <nome> [--path src] [--json]",
    });
  }

  async run(...args: string[]) {
    const [searchTerm, ...rest] = args;
    const flags = this.parseFlags(rest);

    if (!searchTerm) {
      console.log(error("❌ Você deve informar o nome a ser buscado."));
      return;
    }

    const basePath = path.resolve(
      process.cwd(),
      flags["--path"] || ("src" as any)
    );
    const returnJson = flags["--json"];

    if (!fs.existsSync(basePath)) {
      console.log(error(`❌ Caminho "${basePath}" não encontrado.`));
      return;
    }

    const spinner = ora(`Buscando referências para "${searchTerm}"...`).start();

    const project = new Project();
    project.addSourceFilesAtPaths(`${basePath}/**/*.{ts,tsx}`);

    const result = new Set<string>();

    try {
      project.getSourceFiles().forEach((file: any) => {
        const identifiers = file.getDescendantsOfKind(SyntaxKind.Identifier);
        identifiers.forEach((id: any) => {
          if (id.getText() === searchTerm) {
            result.add(file.getFilePath());
          }
        });
      });

      const resultsArray = Array.from(result);

      spinner.succeed("🔍 Busca concluída!");

      if (returnJson) {
        console.log(JSON.stringify(resultsArray, null, 2));
      } else if (resultsArray.length === 0) {
        console.log(
          error(`⚠️ Nenhuma referência ao termo "${searchTerm}" encontrada.`)
        );
      } else {
        console.log(success(`✅ Encontrado "${searchTerm}" em:`));
        resultsArray.forEach((file) => console.log(" -", file));
      }
    } catch (err) {
      spinner.fail("❌ Erro durante a análise do código.");
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

export default WhoIsCommand;
