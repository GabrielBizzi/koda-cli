import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { css } from '@emotion/css';
import {
	DatePickerProps,
	DateValidationError,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { ErrorField } from '@/components/ErrorField';

const datePickerClass = css`
	fieldset {
		border: 1px solid red;
	}
`;

export type TDatePickerProps = DatePickerProps<any> & {
	placeholder?: string;
	label?: string;
	width?: string;
	height?: string;
	name?: string;
	size?: 'small' | 'medium';
	fullWidth?: boolean;
	clearable?: boolean;
	format?: string;
	value: Dayjs | undefined;
	required?: boolean;
	textHelper?: string;
	hasError?: boolean;
	onChange: (
		value: any,
		context: PickerChangeHandlerContext<DateValidationError>,
	) => void;
};

export function DatePicker({
	label,
	width = 'initial',
	height,
	onChange,
	value,
	clearable = true,
	format = 'DD/MM/YYYY',
	placeholder,
	fullWidth = true,
	size = 'small',
	name,
	required,
	hasError,
	textHelper,
	...props
}: TDatePickerProps) {
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
				<MuiDatePicker
					{...props}
					name={name}
					className={(hasError && datePickerClass) as string}
					slotProps={{
						textField: {
							size: size,
							placeholder: `${placeholder ?? ''}${
								required ? '*' : ''
							}`,
							fullWidth: fullWidth,
							required: required,
						},
						field: { clearable: clearable },
					}}
					format={format}
					value={value}
					onChange={onChange}
				/>
				{textHelper ? (
					<ErrorField
						error={textHelper ?? 'This field is required'}
					/>
				) : null}
			</div>
		</>
	);
}
