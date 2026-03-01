import { Admin } from '@/_types/Access';

export function isCheckedNode(node: Admin.Access.Accesses) {
	return node.sistemas?.reduce(
		(curr: '1' | '2' | undefined, next) => isCheckedSystem(next) || curr,
		undefined,
	);
}

export function isCheckedSystem(system: Admin.Access.Sistema) {
	if (system.menus) {
		if (system.menus.every((menu) => isCheckedMenu(menu) === '2'))
			return '2';
		if (system.menus.some((menu) => isCheckedMenu(menu))) return '1';
	}
	if (system.ativo) return '2';
	return;
}

export function isCheckedMenu(menu: Admin.Access.Menu) {
	if (menu.submenus) {
		if (menu.submenus.every((menu) => menu.ativo)) return '2';
		if (menu.submenus.some((menu) => menu.ativo)) return '1';
	}
	if (menu.ativo) return '2';
	return;
}

export function check(
	data: Admin.Access.Accesses[],
	codes: number[],
): Admin.Access.Accesses[] {
	const [node, system, menu, submenu]: Array<number> = codes;
	return data.map((n, index) => {
		if (index !== node) return n;
		for (const sistema of n.sistemas) {
			if (sistema.codigoSistema === system) {
				if (menu) {
					for (const m of sistema.menus || []) {
						if (m.codigoMenu === menu) {
							if (submenu) {
								for (const s of m.submenus || []) {
									if (s.codigoMenu === submenu) {
										s.ativo = !s.ativo;

										if (s.ativo) {
											s.editar = true;
											s.exportar = true;
											s.integrar = true;
										} else {
											s.editar = false;
											s.exportar = false;
											s.integrar = false;
										}
									}
								}
							} else {
								const nextValue = !m.ativo;

								if (m.submenus) {
									m.submenus = m.submenus.map((s) => ({
										...s,
										ativo: nextValue,
										editar: nextValue,
										exportar: nextValue,
										integrar: nextValue,
									}));
								}
								m.ativo = nextValue;
							}
						}
					}
					sistema.ativo = sistema.menus!.some((s) => s.ativo);
				} else {
					const nextValue = !sistema.ativo;
					if (sistema.menus) {
						sistema.menus = sistema.menus.map((m) => ({
							...m,
							ativo: nextValue,
							submenus: m.submenus?.map((s) => ({
								...s,
								ativo: nextValue,
								editar: nextValue,
								exportar: nextValue,
								integrar: nextValue,
							})),
						}));
						sistema.ativo = nextValue;
					}
				}
			}
		}
		return n;
	});
}

export function alterKey(
	data: Admin.Access.Accesses[],
	key: 'editar' | 'exportar' | 'integrar',
	codes: number[],
): Admin.Access.Accesses[] {
	const [node, system, menu, submenu]: Array<number> = codes;
	return data.map((n, index) => {
		if (index !== node) return n;
		for (const sistema of n.sistemas) {
			if (sistema.codigoSistema === system) {
				for (const m of sistema.menus || []) {
					if (m.codigoMenu === menu) {
						for (const s of m.submenus || []) {
							if (s.codigoMenu === submenu) {
								s[key] = !s[key];
								s.ativo = !!(
									s.editar ||
									s.exportar ||
									s.integrar
								);
							}
						}
					}
				}
			}
		}

		return n;
	});
}
