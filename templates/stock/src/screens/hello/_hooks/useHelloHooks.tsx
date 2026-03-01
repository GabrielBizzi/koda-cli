import { formatToCurrency } from '@/utils/formatters';
import { ColumnProps } from '@ti_torra/web';
import { useCallback, useEffect, useState } from 'react';

export function useHelloHooks() {
    const TABLE_COLUMNS_KEY = 'LISTA_VAGAS_COLUMNS';
    const isClient = typeof window !== 'undefined';

    const [columnProperties, setColumnProperties] = useState<
        ColumnProps<any>[]
    >([]);

    const getDefaultColumns = useCallback(
        (): ColumnProps<any>[] => [
            {
                name: 'descricao',
                align: 'left',
                label: 'Descrição do produto',
                visible: true,
            },
            {
                name: 'sku',
                align: 'left',
                label: 'SKU',
                visible: true,
            },
            {
				name: 'custo',
				align: 'left',
				label: 'Custo',
				visible: true,
				render: (row: any) => formatToCurrency(row.custo),
			},
            {
                name: 'estoque',
                align: 'left',
                label: 'Estoque',
                visible: true,
            },
            {
                name: 'status',
                align: 'left',
                label: 'Status',
                visible: true,
            },
        ],
        [],
    );

    useEffect(() => {
        const DEFAULT_COLUMNS_STATE = getDefaultColumns();

        if (isClient) {
            const data = window.localStorage.getItem(TABLE_COLUMNS_KEY);
            if (data) {
                const columns = JSON.parse(
                    data,
                ) as typeof DEFAULT_COLUMNS_STATE;

                const updated = DEFAULT_COLUMNS_STATE.map((column) => {
                    const col = columns.find((col) => col.name === column.name);
                    if (col) return { ...column, visible: col.visible };
                    return column;
                });
                setColumnProperties(updated);
                return;
            }
        }

        setColumnProperties(DEFAULT_COLUMNS_STATE);
    }, [isClient, getDefaultColumns]);

    const handleUpdateVisibleColumns = useCallback(
        function (columns: ColumnProps<any>[]) {
            setColumnProperties(columns);
            if (isClient) {
                window.localStorage.setItem(
                    TABLE_COLUMNS_KEY,
                    JSON.stringify(columns),
                );
            }
        },
        [setColumnProperties, isClient],
    );

    const products = [
        {
            sku: 'IT1532',
            descricao: 'CALCA JEANS SLIM FIT',
            custo: 120.5,
            estoque: 15,
            status: 'Em andamento',
        },
        {
            sku: 'IT8890',
            descricao: 'Motor de pop 15HP',
            custo: 200.5,
            estoque: 17,
            status: 'Processado',
        },
        {
            sku: 'IT1111',
            descricao: 'Escapamento ',
            custo: 1200.5,
            estoque: 16,
            status: 'Processado',
        },
    ];

    return {
        columnProperties,
        products,
        handleUpdateVisibleColumns,
    };
}
