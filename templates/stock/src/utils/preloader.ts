import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function preloader(fn: GetServerSideProps): GetServerSideProps {
	return async (ctx: GetServerSidePropsContext) => {
		return fn(ctx);
	};
}
