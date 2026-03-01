import { css } from '@emotion/css';
import {
	DateValidationError,
	DatePicker as MuiDatePicker,
	PickerChangeHandlerContext,
	PickersDay,
	PickersDayProps,
} from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { TDatePickerProps } from './types.zod';
import { ErrorField } from '@/components/ErrorField';

const datePickerClass = css`
	fieldset {
		border: 1px solid red;
	}
`;

interface CustomDatePickerProps extends TDatePickerProps {
	enabledRange?: [Dayjs, Dayjs] | null;
	validatedRange?: Dayjs[];
	messageValidation?: string;
	label?: string;
	width?: string;
	height?: string;
}

function CustomDay(
	props: PickersDayProps<Dayjs> & { validatedDays?: Dayjs[] },
) {
	const { day, validatedDays, ...other } = props;

	const isValidatedDay = validatedDays?.some((validatedDay) =>
		day.isSame(validatedDay, 'day'),
	);

	return (
		<PickersDay
			{...other}
			day={day}
			sx={{
				...(isValidatedDay && { color: 'red', fontWeight: 'bold' }),
			}}
		/>
	);
}

export function DatePicker({
	onChange,
	label,
	width,
	height,
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
	enabledRange,
	validatedRange,
	messageValidation = 'Data não disponível',
	...props
}: CustomDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(value);
	const { enqueueSnackbar } = useSnackbar();

	const shouldDisableDate = (date: Dayjs) => {
		if (enabledRange) {
			const [start, end] = enabledRange;
			return date.isBefore(start, 'day') || date.isAfter(end, 'day');
		}

		return false;
	};

	useEffect(() => {
		if (
			selectedDate &&
			validatedRange?.some((validatedDay) =>
				selectedDate.isSame(validatedDay, 'day'),
			)
		) {
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDate]);

	const handleChange = (
		newDate: Dayjs | null,
		ctx: PickerChangeHandlerContext<DateValidationError>,
	) => {
		if (
			newDate &&
			validatedRange?.some((validatedDay) =>
				newDate.isSame(validatedDay, 'day'),
			)
		) {
			return enqueueSnackbar(messageValidation, { variant: 'warning' });
		}

		setSelectedDate(newDate);
		onChange?.(newDate, ctx);
	};

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
					value={selectedDate}
					onChange={handleChange}
					shouldDisableDate={shouldDisableDate}
					className={(hasError && datePickerClass) as string}
					slots={{
						day: (props) => (
							<CustomDay
								{...props}
								validatedDays={validatedRange}
							/>
						),
					}}
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
