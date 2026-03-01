import { ResultadoListSchema, UsuarioDataSchema } from '@/common/_index';
import { FilialSchema } from '@/_types/filial';
import { api } from '@/services/api';

export async function getUserBranchs(token: string, userId: number) {
	const userReq = await api.get(`/Admin/v1/Usuario?codigoUsuario=${userId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const userData = ResultadoListSchema(UsuarioDataSchema).parse(userReq.data);

	const filiaisResp = await api.get(`/Admin/v1/filial`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const filiaisResult =
		ResultadoListSchema(FilialSchema).parse(filiaisResp.data) ?? [];

	const filiaisUsuario = userData.conteudo
		?.at(0)
		?.filiais?.filter((f: any) => f.selecionado);

	return filiaisUsuario && filiaisUsuario.length > 0
		? filiaisResult.conteudo?.filter(
				(filial: any) =>
					filial.tipoFilial?.toLowerCase() === 'cd' &&
					filiaisUsuario.some(
						(f: any) => f.codigoFilial === filial.codigoFilial,
					),
		  )
		: filiaisResult.conteudo?.filter(
				(filial: any) => filial.tipoFilial?.toLowerCase() === 'cd',
		  ) ?? [];
}
