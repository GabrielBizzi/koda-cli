'use client';

import { ListPagination } from '@/common/_index';
import ControlledFiltersAccordion from '@/components/AccordionFilter';
import { Header } from '@/components/Header';
import { usePagination } from '@/context/pagination.context';
import { Content } from '@/layout/styles';
import { Col, Grid, Row } from '@ti_torra/web';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHelloHooks } from './_hooks/useHelloHooks';
import { Table } from '@/components/Table';

export default function Hello() {
    // Funções
    const form = useForm();
    const [totalPages, _setTotalPages] = useState<number>(1);
    const { columnProperties, handleUpdateVisibleColumns, products } =
        useHelloHooks();
    const { currentPage, searchParams, handleUpdatePaginationSize } =
        usePagination();
    // HTML
    /**
     * 1. Content
     * 2. Header
     * 3. ControlledFiltersAccordion
     * xl: 10, -> tela > 1440px
     * lg: 10, -> tela >= 1024px
     * md: 10, -> tela >= 768px
     * sm: 10, -> tela < 768px
     * 4. Tabela
     * 5. List
     */
    return (
        <Content>
            <Header title="Hello word Page" />

            <ControlledFiltersAccordion
                form={form}
                onSubmit={(values) => console.log({ values })}
                tabStatus={[
                    { label: 'Todos', value: 'todos' },
                    { label: 'Em andamento', value: 'andamento' },
                    { label: 'Processado', value: 'processado' },
                ]}
                inputs={[
                    {
                        name: 'produto',
                        type: 'text',
                        placeholder: 'Digite o produto que queira pesquisar',
                        label: 'Produto',
                        xl: 5,
                        lg: 5,
                        md: 4,
                        sm: 12,
                    },
                    {
                        name: 'sku',
                        type: 'text',
                        placeholder: 'Digite o sku que queira pesquisar',
                        label: 'SKU',
                        xl: 5,
                        lg: 5,
                        md: 4,
                        sm: 12,
                    },
                ]}
                SearchProps={{
                    hasGearButton: true,
                    lg: 2,
                    md: 4,
                    sm: 12,
                    xl: 2,
                    exportable: false,
                    dialogProps: {
                        autoPaginateOnChange: true,
                        onCommit: ({ columns, pagination }) => {
                            handleUpdateVisibleColumns(columns);
                            handleUpdatePaginationSize(pagination);
                        },
                        columns: columnProperties!,
                    },
                }}
            />

            <Grid>
                <Row>
                    <Col sm={12} md={12} lg={12} xl={12}>
                        <Table
                            content={products}
                            columns={columnProperties!}
                        />
                        <ListPagination
                            search={searchParams}
                            page={currentPage}
                            totalPages={totalPages}
                            callback={() => {}}
                        />
                    </Col>
                </Row>
            </Grid>
        </Content>
    );
}
