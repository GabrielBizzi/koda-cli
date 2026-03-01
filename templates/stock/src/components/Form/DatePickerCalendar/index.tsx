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
	}, [enqueueSnackbar, messageValidation, selectedDate, validatedRange]);

	useEffect(() => {
		if (!selectedDate?.isSame(value, 'day')) {
			setSelectedDate(value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

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
			enqueueSnackbar(messageValidation, { variant: 'warning' });
		}

		setSelectedDate(newDate);
		onChange?.(newDate, ctx);

		if (!newDate?.isSame(value, 'day')) {
			setSelectedDate(value);
		}
	};

	return (
		<>
			<MuiDatePicker
				{...props}
				name={name}
				value={selectedDate}
				onChange={handleChange}
				shouldDisableDate={shouldDisableDate}
				className={(hasError && datePickerClass) as string}
				slots={{
					day: (props) => (
						<CustomDay {...props} validatedDays={validatedRange} />
					),
				}}
				slotProps={{
					textField: {
						size: size,
						placeholder: `${placeholder ?? ''}${required ? '*' : ''}`,
						fullWidth: fullWidth,
						required: required,
					},
					field: { clearable: clearable },
				}}
				format={format}
			/>
			{textHelper ? (
				<ErrorField error={textHelper ?? 'This field is required'} />
			) : null}
		</>
	);
}
