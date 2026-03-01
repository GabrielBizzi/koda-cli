import { css } from '@emotion/css';
import { Card, CardContent } from '@mui/material';
import { DescriptionModule, TitleModule } from './styles';
import { useBreakpoint } from '@/utils/breakpoints';

type ModuleProps = {
	title: string;
	description: string;
	onClick: () => void;
	icon: React.ReactElement;
};

export const Module = ({ icon, description, onClick, title }: ModuleProps) => {
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';

	return (
		<Card
			elevation={0}
			className={css`
				border: 1px solid var(--color-neutral-02);
				padding: 8px;
				/* gap: 24px; */
				min-width: 200px;
				flex: 1 0 19%;
				/* width: calc(30%); */
				/* max-width: 19%; */
				max-width: ${mobile ? `100%` : `33%`};
				border-radius: 0rem !important;
				transition: 0.3s ease-in-out all !important;
				&:hover {
					transform: scale(1.1);
					cursor: pointer;
				}
				text-align: left;
			`}
			onClick={onClick}
		>
			<CardContent>
				{icon}
				<TitleModule>{title}</TitleModule>
				<DescriptionModule>
					{/* Crie ou edite perfis e cadastros de usuários. */}
					{description}
				</DescriptionModule>
			</CardContent>
			{/* <CardActions
				className={css`
					justify-content: flex-end;
				`}
			>
				<Button
					variant="contained"
					color="primary"
					disableElevation
					style={{ borderRadius: 0 }}
					onClick={onClick}
				>
					{buttonText}
				</Button>
			</CardActions> */}
		</Card>
	);
};
