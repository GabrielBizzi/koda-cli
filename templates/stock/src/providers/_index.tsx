import { ComponentType, ReactNode } from 'react';

export type WrapperProvider = ComponentType<{ children: ReactNode }>;

type ObjectProvider<P extends WrapperProvider = WrapperProvider> = {
	Provider: P;
	props?: Omit<React.ComponentProps<P>, 'children'>;
};

type ProviderProp = WrapperProvider | ObjectProvider;
type MaybeProvider = ProviderProp | false | null | undefined;

type Props = {
	providers: MaybeProvider[];
	children: ReactNode;
};

function isObjectProvider(provider: ProviderProp): provider is ObjectProvider {
	return (provider as ObjectProvider).Provider !== undefined;
}
export const Providers = ({ children, providers }: Props) => {
	return providers.filter(Boolean).reduce((prev, next) => {
		if (!next) return prev;

		if (isObjectProvider(next as ProviderProp)) {
			const NextProvider = next as ObjectProvider;
			return (
				<NextProvider.Provider {...NextProvider.props}>
					{prev}
				</NextProvider.Provider>
			);
		}

		const NextProvider = next as WrapperProvider;
		return <NextProvider>{prev}</NextProvider>;
	}, <>{children}</>);
};
