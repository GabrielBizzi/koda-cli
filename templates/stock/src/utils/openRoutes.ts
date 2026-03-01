export function matchRoute(pathname: string, openRoutes: string[]): boolean {
	return openRoutes.some((route) => {
		const regex = new RegExp(
			'^' +
				route.replace(/\[.*?\]/g, '[^/]+').replace(/\//g, '\\/') +
				'$',
		);
		return regex.test(pathname);
	});
}

export const openRoutes = ['/', '/hello'];
