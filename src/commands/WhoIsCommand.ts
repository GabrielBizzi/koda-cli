import BaseCommand from "./BaseCommand";
import { Project, SyntaxKind } from "ts-morph";
import path from "path";
import { success, error } from "../utils/console";
import fs from "fs";
import ora from "ora";
import { Command } from "commander";

class WhoIsCommand extends BaseCommand {
  constructor() {
    super({
      name: "whois",
      description: "Encontra onde determinado identificador é usado",
      usage: "whois <nome>",
    });
  }

  public register(cli: Command): void {
    cli
      .command(this.getUsage())
      .alias(this.getAlias())
      .description(this.getDescription())
      .option("--path <path>", "Base path (default: src)")
      .option("--json", "Return output as JSON")
      .action(async (arg: string, options: any) => {
        await this.run(arg, options);
      });
  }

  async run(searchTerm?: string, options?: Record<string, any>) {
    if (!searchTerm) {
      console.log(error("❌ Você deve informar o nome a ser buscado."));
      return;
    }

    const basePath = path.resolve(process.cwd(), options?.path || "src");

    const returnJson = options?.json ?? false;

    if (!fs.existsSync(basePath)) {
      console.log(error(`❌ Caminho "${basePath}" não encontrado.`));
      return;
    }

    const spinner = ora(`Buscando referências para "${searchTerm}"...`).start();

    const project = new Project();
    project.addSourceFilesAtPaths(`${basePath}/**/*.{ts,tsx}`);

    const result = new Set<string>();

    try {
      project.getSourceFiles().forEach((file) => {
        const identifiers = file.getDescendantsOfKind(SyntaxKind.Identifier);
        identifiers.forEach((id) => {
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
          error(`⚠️ Nenhuma referência ao termo "${searchTerm}" encontrada.`),
        );
      } else {
        console.log(success(`✅ Encontrado "${searchTerm}" em:`));
        resultsArray.forEach((file) => console.log(" -", file));
      }
    } catch {
      spinner.fail("❌ Erro durante a análise do código.");
    }
  }
}

export default WhoIsCommand;
