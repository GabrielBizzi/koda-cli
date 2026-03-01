import type FS from 'fs';
export type Value = string | number | symbol;
export type LooseAutoComplete<T extends Value> = T | object;
export type Maybe<T> = T | null | undefined;
export type Children = {
	children: ReactNode;
};

export type FCWithChildren<
	ComponentProps extends object = Record<string, unknown>,
	IsChildrenRequired extends boolean = false,
> = FC<
	IsChildrenRequired extends true
		? ComponentProps & Children
		: ComponentProps & Partial<Children>
>;
export interface Linguagem {
	codigo: string;
	descricao: string;
}
export type Size = {
	width?: number;
	height?: number;
};

declare module Window {
	type fs = FS;
}
