import { css, cx } from '@emotion/css';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Link } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import labelTranslations from './labelTranslations.json';
import { Contents, Wrapper } from './styles';

function useBreadcrumbs() {
	const path = usePathname();
	const queryParams = useSearchParams();

	const labelDictionary = {
		...labelTranslations,
		'[id]': `ID ${queryParams.get('id')}`,
	} as const;

	function unfoldPath(
		current: string,
		acc: [link: string, label: string | JSX.Element][] = [],
	) {
		if (!current) return [...acc, ['/', 'Home']].reverse();
		const sections = current.split('/');
		const link = current;
		const labelName = sections.at(-1)!;
		const rawLabel =
			labelDictionary[labelName as keyof typeof labelDictionary] ??
			labelName.replace(/-/g, ' ');
		const label = rawLabel[0]?.toUpperCase() + rawLabel.substring(1);
		const next = sections.slice(0, sections.length - 1).join('/');
		return unfoldPath(next, [...acc, [link, label]]);
	}

	const pathSections = unfoldPath(path);

	return { pathSections };
}

export default function Breadcrumbs() {
	const { pathSections } = useBreadcrumbs();
	return (
		<Wrapper>
			<Contents
				aria-label="breadcrumb"
				separator={
					<ChevronRight
						sx={{
							width: 15,
							height: 15,
						}}
						style={{
							opacity: 0.8,
						}}
					/>
				}
			>
				{pathSections.length > 0
					? pathSections.map(([link, label], idx, arr) => (
							<Link
								key={link as string}
								href={
									label === 'home'
										? '/modules'
										: (link as string)
								}
								underline="none"
								className={cx(
									css`
										position: relative;
										top: -0.15em;
										color: rgb(62, 96, 213);
										font-size: 12px !important;
										font-style: normal !important;
										font-weight: 300 !important;
										line-height: 16px !important;
									`,
									idx === arr.length - 1 &&
										css`
											font-weight: bold !important;
										`,
								)}
							>
								{label ?? ''}
							</Link>
					  ))
					: 'Home'}
			</Contents>
		</Wrapper>
	);
}
