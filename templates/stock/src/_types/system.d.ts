export namespace SystemDetails {
    export interface Sistema {
        codigoSistema: number;
        url: string;
        tag: 'Web' | 'Mobile' | string;
        sequencia: number;
        linguagens: Linguagem[];
    }

    export interface Menu {
        codigoMenu: number;
        linguagens: Linguagem[];
        pagina: string;
        sequencia: number;
        icone: string;
        submenus?: SubMenu[];
        criadoPor: number;
        criadoEm: string;
    }

    type SubMenu = Omit<Menu, 'menus'>;
}
