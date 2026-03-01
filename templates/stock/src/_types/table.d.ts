type ColsAlign =
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent'
    | '-moz-center'
    | '-webkit-center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset';
type ColsSize = {
    size: number;
    alignText?: ColsAlign;
};
export type ColumnProps<T> = {
    name: keyof T;
    label: string;
    visible: boolean;
    align?: ColsAlign;
    render?(row: T, index?: number): React.ReactNode;
};

interface TableCheckboxActions<T> {
    enableCheckbox: boolean;
    onRowChecked?: (
        row: T,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void> | void;
    onAllChecked?: (
        rows: T[],
        event: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void> | void;
}

interface TableCommonProps<T> {
    content: T[];
    filters?: React.ReactNode;
    columns: ColumnProps<T>[];
    /**
     * Define a tabela para oculpar 100% do tamanho disponível
     * @property {boolean} maxSize
     */
    maxSize?: boolean;
    onRowChecked?: (
        row: T,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void> | void;
    onAllChecked?: (
        rows: T[],
        event: React.ChangeEvent<HTMLInputElement>,
    ) => Promise<void> | void;
}
export type TableProps<T> =
    | ({ enableCheckbox?: false } & TableCommonProps<T>)
    | (TableCheckboxActions<T> & TableCommonProps<T>);
