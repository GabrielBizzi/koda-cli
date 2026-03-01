import { api } from '@/services/api';
import { sidebarStore } from '@/stores/sidebar';
import { SYSTEM_CODE } from '@/utils/systemCode';

export async function loadSidebar(token: string) {
	const { setSidebar } = sidebarStore();

	const { data } = await api.get(`/Admin/v1/Menu/${SYSTEM_CODE}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	// @ts-ignore
	setSidebar?.(data.conteudo);
}
