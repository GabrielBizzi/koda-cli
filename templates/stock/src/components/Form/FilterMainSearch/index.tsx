import {
	IconButton,
	InputAdornment,
	OutlinedInput,
	SvgIcon,
} from '@mui/material';
import { FilterMainSearchProps } from './types.zod';
import SearchSvg from '@/assets/images/svg/Search.svg';
import { css } from '@emotion/css';

export function FilterMainSearch({
	onSearch,
	icon = false,
	required = false,
	textHelper,
	hasError,
	label,
	width,
	height,
	...props
}: FilterMainSearchProps) {
	return (
		<>
			<div
				className={css`
					display: flex;
					flex: 1 0 auto;
					flex-direction: column;
					gap: ${required && !label
						? '0.2rem'
						: required && label
							? '0.5rem'
							: '0.5rem'};
					width: ${width};
					max-height: ${height};
				`}
			>
				{label ? (
					<div
						style={{
							display: 'flex',
						}}
					>
						<label
							style={{ color: 'rgba(0, 0, 0, 0.6)' }}
							className={css`
								font-family: var(--font-montserrat);
								font-weight: 400;
								font-size: 1rem;
								line-height: 1.4375em;
								padding: 0;
								position: relative;
								display: block;
								transform-origin: top left;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								max-width: 100%;
							`}
							htmlFor={`input_${label}`}
						>
							{label}
						</label>
						{required && (
							<span
								className={css`
									color: red;
									margin-left: 0.2rem;
									margin-bottom: 0;
								`}
							>
								*
							</span>
						)}
					</div>
				) : null}
				<OutlinedInput
					fullWidth
					type="search"
					size="small"
					onKeyDown={(e) => e.key === 'Enter' && void onSearch()}
					endAdornment={
						icon ? (
							<InputAdornment position="end">
								<IconButton
									type="button"
									aria-label="Pesquisar"
									edge="end"
									onClick={onSearch}
								>
									<SvgIcon component={SearchSvg} />
								</IconButton>
							</InputAdornment>
						) : undefined
					}
					{...props}
				/>
			</div>
		</>
	);
}
