import fs from "fs";
import path from "path";
import Spinner from "../utils/loader";
import { error } from "../utils";
import { capitalize, kebabCase } from "../utils/formatters";
import BaseCommand from "./BaseCommand";
import { Command } from "commander";

interface GenerateOptions {
  withModal?: boolean;
}

class GenerateCommand extends BaseCommand {
  constructor() {
    // Criação de construtor
    super({
      name: "generate",
      description: "Gera telas ou rotas no padrão Stock",
      usage: "generate <screen|route|page> <Nome|/rota>",
    });
  }

  public register(cli: Command): void {
    cli
      .command(this.getUsage())
      .alias(this.getAlias())
      .description(this.getDescription())
      .option("--with-modal", "Gera estrutura com modal")
      .action(async (type: string, name: string, options: GenerateOptions) => {
        await this.run(type, name, options);
      });
  }

  public async run(
    type?: string,
    name?: string,
    options?: GenerateOptions,
  ): Promise<void> {
    const spinner = new Spinner().spinner;

    if (!type || !name) {
      console.error(
        "Use:\n- generate screen Hello\n- generate route /hello\n- generate page Hello",
      );
      return;
    }

    switch (type) {
      case "screen":
        await this.generateScreen(name, spinner);
        break;

      case "route":
        await this.generateRoute(name, spinner);
        break;

      case "page":
        await this.generateScreen(name, spinner);
        await this.generateRoute(name, spinner);

        if (options?.withModal) {
          await this.generateModal(name, spinner);
        }
        break;

      default:
        console.error("Tipo inválido.");
    }
  }

  private splitInputPath(input: string): string[] {
    return input.split(/[\\/]/).filter(Boolean);
  }

  private async generateScreen(name: string, spinner: any) {
    spinner.start("Gerando screen no padrão Stock...");

    const parts = this.splitInputPath(name);
    const finalName = capitalize(parts[parts.length - 1]);
    const hookName = `use${finalName}Hooks`;

    const screenPath = path.join(process.cwd(), "src", "screens", ...parts);

    const hooksPath = path.join(screenPath, "_hooks");

    fs.mkdirSync(hooksPath, { recursive: true });

    const screenFile = path.join(screenPath, "index.tsx");
    const hookFile = path.join(hooksPath, `${hookName}.tsx`);

    if (fs.existsSync(screenFile)) {
      spinner.fail(error("Screen já existe."));
      return;
    }

    fs.writeFileSync(screenFile, this.getScreenTemplate(finalName, hookName));

    fs.writeFileSync(hookFile, this.getHookTemplate(finalName, hookName));

    spinner.succeed(`Screen ${finalName} criada.`);
  }

  private async generateRoute(name: string, spinner: any) {
    const rawParts = this.splitInputPath(name);
    const parts = rawParts.map(kebabCase);
    const importPath = rawParts.join("/");

    const routePath = path.join(
      process.cwd(),
      "src",
      "app",
      "(pages)",
      ...parts,
    );

    fs.mkdirSync(routePath, { recursive: true });

    const finalName = capitalize(parts[parts.length - 1]);

    fs.writeFileSync(
      path.join(routePath, "page.tsx"),
      `import ${finalName} from '@/screens/${importPath}';

export const dynamic = 'force-dynamic';

export default function ${finalName}Page() {
  return <${finalName} />;
}
`,
    );

    spinner.succeed("Route criada.");
  }

  private async generateModal(name: string, spinner: any) {
    spinner.start("Gerando estrutura de modal...");

    const parts = this.splitInputPath(name).map(kebabCase);
    const finalName = capitalize(parts[parts.length - 1]);

    const routeRoot = path.join(
      process.cwd(),
      "src",
      "app",
      "(pages)",
      ...parts,
    );

    const modalPath = path.join(routeRoot, "@modal");
    const updatePath = path.join(modalPath, "(.)update");

    fs.mkdirSync(updatePath, { recursive: true });

    fs.writeFileSync(
      path.join(modalPath, "default.tsx"),
      `export default function DefaultModal() {
  return null;
}
`,
    );

    fs.writeFileSync(
      path.join(updatePath, "page.tsx"),
      `import PageOverlay from '@/components/PageOverlay';
import ${finalName}Update from '@/screens/${parts.join("/")}/Update';

export default function ${finalName}UpdateModal() {
  return (
    <PageOverlay>
      <${finalName}Update />
    </PageOverlay>
  );
}
`,
    );

    fs.writeFileSync(
      path.join(routeRoot, "layout.tsx"),
      `import { ReactNode } from 'react';

export default function ${finalName}Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
`,
    );

    spinner.succeed("Modal criado com sucesso.");
  }

  private getScreenTemplate(screenName: string, hookName: string) {
    return `'use client';

import { ListPagination } from '@/common/_index';
import ControlledFiltersAccordion from '@/components/AccordionFilter';
import { Header } from '@/components/Header';
import { usePagination } from '@/context/pagination.context';
import { Content } from '@/layout/styles';
import { Col, Grid, Row } from '@ti_torra/web';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ${hookName} } from './_hooks/${hookName}';
import { Table } from '@/components/Table';

export default function ${screenName}() {
  const form = useForm();
  const [totalPages] = useState<number>(1);
  const { columnProperties, handleUpdateVisibleColumns, products } =
    ${hookName}();
  const { currentPage, searchParams, handleUpdatePaginationSize } =
    usePagination();

  return (
    <Content>
      <Header title="${screenName} Page" />
    </Content>
  );
}
`;
  }

  private getHookTemplate(screenName: string, hookName: string) {
    return `export function ${hookName}() {
  return {
    columnProperties: [],
    products: [],
    handleUpdateVisibleColumns: () => {},
  };
}
`;
  }
}

export default GenerateCommand;
