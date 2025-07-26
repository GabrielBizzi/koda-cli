import fs from "fs";
import path from "path";
import Spinner from "../utils/loader";
import { error } from "../utils";
import { capitalize, kebabCase, lowerCaseFirst } from "../utils/formatters";
import BaseCommandMultiArg from "./BaseCommandOptions";

class GenerateCommand extends BaseCommandMultiArg {
  constructor() {
    super({
      name: "generate",
      description: "Gera telas ou rotas baseadas no tipo escolhido",
      usage: "generate <screen|route> <Nome|/rota>",
    });
  }

  public async run(
    entityType?: string,
    entityNameOrPath?: string
  ): Promise<void> {
    const spinner = new Spinner().spinner;

    if (!entityType || !entityNameOrPath) {
      console.error(
        "❌ Formato inválido. Use:\n- generate screen MinhaTela\n- generate route /inventario/minha-rota"
      );
      return;
    }

    switch (entityType) {
      case "screen":
        await this.generateScreen(entityNameOrPath, spinner);
        break;

      case "route":
        await this.generateRoute(entityNameOrPath, spinner);
        break;

      default:
        console.error(
          `❌ Tipo '${entityType}' não suportado. Use 'screen' ou 'route'.`
        );
        return;
    }
  }

  private async generateScreen(name: string, spinner: any) {
    spinner.start("🔧 Gerando estrutura da tela...");

    try {
      const screenParts = name.split(/[\\/]/);
      const finalName = screenParts.at(-1)!;

      const screenName = capitalize(finalName);
      const camelName = lowerCaseFirst(finalName);
      const kebabName = kebabCase(finalName);
      const baseDir = path.resolve(process.cwd());

      const screenPath = path.join(baseDir, "src", "screens", ...screenParts);
      const hooksPath = path.join(screenPath, "hooks");
      const typesPath = path.join(screenPath, "types");
      const screenFilePath = path.join(screenPath, "index.tsx");

      const pageFolderPath = path.join(
        baseDir,
        "src",
        "pages",
        ...screenParts.map(kebabCase)
      );
      const pageFilePath = path.join(pageFolderPath, "index.tsx");

      const screenImportPath = `@/screens/${screenParts.join("/")}`;

      fs.mkdirSync(hooksPath, { recursive: true });
      fs.mkdirSync(typesPath, { recursive: true });
      fs.mkdirSync(pageFolderPath, { recursive: true });

      fs.writeFileSync(
        screenFilePath,
        `import {
  ListPagination,
} from '@/_common/_index';
import { EmptyList } from '@/components/EmptyList';
import { SearchButton } from '@/components/Form/Search';
import { TextField } from '@/components/Form/TextField';
import { Header } from '@/components/Header';
import { Content } from '@/layout/styles';
import { CircularProgress } from '@mui/material';
import { Col, Grid, Row, Table } from '@ti_torra/web';
import { use${capitalize(screenName)} } from './hooks/use${capitalize(
          screenName
        )}';
        
const ${screenName} = () => {
  const {
    handleUpdateVisibleColumns,
    columnProperties,
    loading,
    stateList,
    query,
    setQuery,
    fetchData,
    totalPages,
  } = use${capitalize(screenName)}();

  return (
    <Content>
      <Header
        title="${capitalize(screenName)}"
        filters={
          <Row>
            <Col sm={12} md={6} lg={8} xl={8}>
              <TextField
                fullWidth
                name="query"
                value={query}
                placeholder="Filter 1"
                label="Filter 1"
                onChange={(e) => setQuery(e.target.value as string)}
              />
            </Col>

            <Col sm={12} md={6} lg={4} xl={4}>
              <SearchButton
                onClickSearch={() => fetchData()}
                hasGearButton
                dialogProps={{
                  autoPaginateOnChange: true,
                  onCommit: ({ columns, pagination }) => {
                    handleUpdateVisibleColumns(columns);
                    handleUpdatePaginationSize(pagination);
                  },
                  columns: columnProperties!,
                }}
              />
            </Col>
          </Row>
        }
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : stateList && stateList.length > 0 ? (
        <Grid>
          <Row>
            <Col sm={12} md={12} lg={12} xl={12}>
              <div>
                <div style={{ marginBottom: '0px' }}>
                  <Table content={stateList} columns={columnProperties!} />
                </div>
                <ListPagination
                  search={searchParams}
                  page={currentPage}
                  totalPages={totalPages}
                  callback={fetchData}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      ) : (
        <EmptyList />
      )}
    </Content>
  );
};

export default ${screenName};
`
      );

      // Criar hook
      fs.writeFileSync(
        path.join(hooksPath, `use${screenName}.ts`),
        `import {
  readPaginadoDefault,
  ResultadoListSchema,
} from '@/_common/_index';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { usePagination } from '@/hooks/usePagination';
import { api, buildFilter } from '@/services/api';
import { buildQueryParams } from '@/utils/buildQueryParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { ${capitalize(screenName)}Response, ${capitalize(
          screenName
        )}State } from '../types/${camelName}.types';

const TABLE_COLUMNS_KEY = '${screenName.toUpperCase()}_COLUMNS';
const isClient = typeof window !== 'undefined';

export const use${screenName} = () => {
  const [stateList, setStateList] = useState<Array<any>>([]);
  const handleError = useErrorHandler();
  const [loading, setLoading] = useState<boolean>();
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number>(1);

  const {
    currentPage,
    size,
    setCurrentPage,
    searchParams,
    handleUpdatePaginationSize,
  } = usePagination();

  const DEFAULT_COLUMNS_STATE = useMemo(
    () =>
      [
        { name: 'name 1', label: 'Label 1', visible: true },
        { name: 'name 2', label: 'Label 2', visible: true },
      ] as ColumnProps<${capitalize(screenName)}State>[],
    []
  );

  const [columnProperties, setColumnProperties] = useState(() => {
    if (isClient) {
      const data = window.localStorage.getItem(TABLE_COLUMNS_KEY);
      if (data) {
        const columns = JSON.parse(data) as typeof DEFAULT_COLUMNS_STATE;
        return DEFAULT_COLUMNS_STATE.map((column) => {
          const col = columns.find((c) => c.name === column.name);
          return col ? { ...column, visible: col.visible } : column;
        });
      }
    }
    return DEFAULT_COLUMNS_STATE;
  });

  const handleUpdateVisibleColumns = useCallback(
    (columns: ColumnProps<${capitalize(screenName)}State>[]) => {
      setColumnProperties(columns);
      if (isClient) {
        window.localStorage.setItem(
          TABLE_COLUMNS_KEY,
          JSON.stringify(columns)
        );
      }
    },
    []
  );

  const fetchData = useCallback(
    async (page?: number) => {
      setLoading(true);
      try {
        const FetchType = ResultadoListSchema(${capitalize(
          screenName
        )}Response);
        type FetchTypeData = z.infer<typeof FetchType>;

        const search: Record<string, unknown> = {};
        search.Page = page ?? 1;
        search.Limit = size ?? 5;
        const filter = buildFilter(search);

        const queryParams = buildQueryParams({
          query: query ?? undefined,
        });

        const { data } = await api.get<FetchTypeData>(\`/end-point?\${filter}&\${queryParams}\`);

        setStateList(data?.conteudo ?? []);

        const pagination = readPaginadoDefault(data!, () => {});
        setCurrentPage(pagination.pagina);
        setTotalPages(pagination.totalPaginas);
      } catch (error) {
        setStateList([]);
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleError, setCurrentPage, size, query]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return {
    currentPage,
    size,
    setCurrentPage,
    searchParams,
    handleUpdatePaginationSize,
    handleUpdateVisibleColumns,
    columnProperties,
    loading,
    setLoading,
    stateList,
    setStateList,
    query,
    setQuery,
    fetchData,
    setTotalPages,
    totalPages,
  };
};
`
      );

      // Criar types
      fs.writeFileSync(
        path.join(typesPath, `${camelName}.types.ts`),
        `import { z } from 'zod';

export const ${capitalize(screenName)}Response = z.object({
  firstKey: z.string().optional(),
});

export type ${capitalize(screenName)}State = z.infer<typeof ${capitalize(
          screenName
        )}Response>;`
      );

      // Criar page/index.tsx
      fs.writeFileSync(
        pageFilePath,
        `import MainLayout from '@/layout';
import ${screenName} from '${screenImportPath}';


export default function ${screenName}Screen() {  	
  return (
    <MainLayout>
      <${screenName} />
    </MainLayout>
  );
}
`
      );

      spinner.succeed(`✅ Tela '${screenName}' gerada com sucesso!`);
    } catch (err) {
      spinner.fail(error("❌ Falha ao gerar a tela."));
      console.error(err);
    }
  }

  private async generateRoute(routePath: string, spinner: any) {
    const cleanPath = routePath.replace(/^\/|\/$/g, "");
    const parts = cleanPath.split("/");

    if (parts.length === 0) {
      console.error("❌ Caminho de rota inválido.");
      return;
    }

    spinner.start(`🚧 Criando rota em /${cleanPath}...`);

    try {
      const finalName = parts.at(-1)!;
      const folderPath = path.join("src", "pages", ...parts);
      const filePath = path.join(folderPath, "index.tsx"); // ← sempre index.tsx

      fs.mkdirSync(folderPath, { recursive: true });

      if (fs.existsSync(filePath)) {
        spinner.fail("❌ Arquivo já existe.");
        return;
      }

      fs.writeFileSync(
        filePath,
        `import React from "react";

export default function ${capitalize(finalName)}Page() {
  return <div>${finalName}</div>;
}`
      );

      spinner.succeed(`✅ Rota /${cleanPath} criada com sucesso!`);
    } catch (err) {
      spinner.fail(error("❌ Falha ao criar rota."));
      console.error(err);
    }
  }
}

export default GenerateCommand;
