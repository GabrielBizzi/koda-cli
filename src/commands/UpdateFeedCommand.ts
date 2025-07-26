import fs from "fs";
import path from "path";
import BaseCommand from "./BaseCommand";
import { success, error } from "../utils/console";
import { OpenAI } from "openai";
import ora from "ora";
import { warn } from "console";

interface Version {
  version: string;
  date: string;
  url?: string;
  changes: {
    [type: string]: any[];
  };
}

class UpdateFeedCommand extends BaseCommand {
  constructor() {
    super({
      name: "update:feed",
      description:
        "Converte o CHANGELOG.md em um JSON legível para tela de updates",
      usage: "update:feed",
    });
  }

  async validateAndMerge(
    parsed: Version[],
    outputPath: string
  ): Promise<Version[]> {
    let existing: Version[] = [];

    if (fs.existsSync(outputPath)) {
      try {
        const raw = fs.readFileSync(outputPath, "utf-8").trim();

        if (raw.length === 0) {
          console.log(
            warn("⚠️ Arquivo JSON existe, mas está vazio. Iniciando do zero.")
          );
        } else {
          const parsedJson = JSON.parse(raw);
          if (Array.isArray(parsedJson)) {
            existing = parsedJson;
          } else {
            console.log(
              warn("⚠️ JSON existente não é um array. Ignorando conteúdo.")
            );
          }
        }
      } catch (e) {
        console.log(
          error(
            "❌ Erro ao ler ou interpretar o arquivo JSON existente. Será ignorado."
          )
        );
      }
    }

    const existingVersions = new Set(
      existing.map((v) => `${v.version}|${v.url || ""}`)
    );

    const newVersions = parsed.filter(
      (v) => !existingVersions.has(`${v.version}|${v.url || ""}`)
    );

    if (newVersions.length === 0) {
      console.log(
        success("✅ Nenhuma nova versão encontrada. Tudo atualizado!")
      );
      return existing;
    }

    console.log(
      success(`🆕 ${newVersions.length} nova(s) versão(ões) detectada(s).`)
    );
    return [...newVersions, ...existing];
  }
  async run(...args: string[]): Promise<void> {
    const useOpenAI = true;

    const changelogPath = path.resolve(process.cwd(), "CHANGELOG.md");
    const outputPath = path.resolve(process.cwd(), "public/version-feed.json");

    if (!fs.existsSync(changelogPath)) {
      console.log(error("❌ Arquivo CHANGELOG.md não encontrado"));
      return;
    }

    const content = fs.readFileSync(changelogPath, "utf-8");
    const parsed = await this.parseChangelog(content);

    // 🔍 Carrega o version-feed.json existente (se houver)
    let existingFeed: Version[] = [];
    if (fs.existsSync(outputPath)) {
      const raw = fs.readFileSync(outputPath, "utf-8");
      try {
        existingFeed = JSON.parse(raw);
      } catch (err) {
        console.log(error("⚠️ Erro ao ler version-feed.json existente"));
      }
    }

    // 🔎 Pega as versões já existentes (versão + URL, para evitar duplicação com/sem link)
    const existingVersions = new Set(
      existingFeed.map((v) => `${v.version}|${v.url || ""}`)
    );

    // 🚀 Filtra somente as versões novas
    const newVersions = parsed.filter(
      (v) => !existingVersions.has(`${v.version}|${v.url || ""}`)
    );

    if (newVersions.length === 0) {
      console.log(
        success("✅ Nenhuma nova versão encontrada. Tudo atualizado!")
      );
      return;
    }

    const finalParsed = useOpenAI
      ? await this.beautifyWithOpenAI(parsed)
      : parsed;

    const finalOutput = await this.validateAndMerge(finalParsed, outputPath);

    fs.writeFileSync(outputPath, JSON.stringify(finalOutput, null, 2));
    console.log(
      success(
        `✅ Feed atualizado com ${newVersions.length} nova(s) versão(ões)`
      )
    );
  }

  async parseChangelog(content: string) {
    const lines = content.split("\n");

    const versions: Version[] = [];
    let currentVersion: Version | null = null;
    let currentType: string | null = null;

    for (const line of lines) {
      const versionWithLinkAndDate = line.match(
        /^## \[(.*?)\]\((.*?)\) \((.*?)\)/
      ); // Ex: ## [1.42.0](URL) (2025-07-18)

      if (versionWithLinkAndDate) {
        if (currentVersion) versions.push(currentVersion);

        currentVersion = {
          version: versionWithLinkAndDate[1],
          url: versionWithLinkAndDate[2],
          date: versionWithLinkAndDate[3],
          changes: {},
        };
        currentType = null;
        continue;
      }

      // Match seção de tipo (### Features / ### Bug Fixes)
      const sectionMatch = line.match(/^### (Features|Bug Fixes)/i);
      if (sectionMatch) {
        currentType = sectionMatch[1].toLowerCase();
        if (currentVersion) {
          currentVersion.changes[currentType] = [];
        }
        continue;
      }

      // Match de entrada de item: * descrição ([commit](link))
      const itemMatch = line.match(/^\* (.*?) \(\[.*?\]\((.*?)\)\)/);
      if (itemMatch && currentVersion && currentType) {
        const description = `* ${itemMatch[1]}`;
        const commit = itemMatch[2];
        currentVersion.changes[currentType].push({ description, commit });
        continue;
      }

      // Fallback simples: apenas uma linha com "-" ou "*"
      if (
        (line.startsWith("*") || line.startsWith("-")) &&
        currentVersion &&
        currentType
      ) {
        const description = line.replace(/^[-*] /, "").trim();
        currentVersion.changes[currentType].push({ description, commit: "" });
      }
    }

    if (currentVersion) versions.push(currentVersion);

    return versions;
  }

  async beautifyWithOpenAI(parsed: Version[]): Promise<Version[]> {
    const updated: Version[] = [];
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    for (const version of parsed) {
      const spinner = ora(
        `✨ Processando versão ${version.version}...`
      ).start();

      const newChanges: Version["changes"] = {};

      for (const [type, items] of Object.entries(version.changes)) {
        newChanges[type] = [];

        for (const item of items) {
          const prompt = `
Você é um assistente técnico que ajuda a reescrever descrições de changelog.
Receba o seguinte item e:

1. Melhore a clareza e o tom profissional.
2. Traduza para português.
3. Remova os *
4. Retorne apenas o conteúdo, sem títulos ou prefixos, apenas a descrição final melhorada.

Item: "${item.description}"
`;

          try {
            const response = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.4,
            });

            const beautified =
              response.choices[0].message.content?.trim() || item.description;

            newChanges[type].push({
              description: beautified,
              commit: item.commit,
            });
          } catch (err) {
            console.error(`❌ Erro ao processar item: ${item.description}`);
            newChanges[type].push({
              description: item.description,
              commit: item.commit,
            });
          }
        }
      }

      updated.push({
        ...version,
        changes: newChanges,
      });

      spinner.succeed(`✅ Versão ${version.version} finalizada`);
    }

    return updated;
  }
}

export default UpdateFeedCommand;
