import { NextRequest, NextResponse } from 'next/server';
import { matchRoute, openRoutes } from './utils/openRoutes';

export function proxy(request: NextRequest) {
	const { pathname, origin } = request.nextUrl;
	const token = request.cookies.get('Auth.Token');

	// Ignora assets e internos
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/img') ||
		pathname.startsWith('/files') ||
		pathname.startsWith('/videos') ||
		pathname.includes('.')
	) {
		return NextResponse.next();
	}

	if (pathname === '/' || matchRoute(pathname, openRoutes)) {
		return NextResponse.next();
	}

	if (!token) {
		const destination = process.env.NEXT_PUBLIC_PORTAL_URL + '/logout';

		return NextResponse.redirect(new URL(destination, origin));
	}

	return NextResponse.next();
}
