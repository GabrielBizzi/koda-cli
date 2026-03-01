import {
	DatePickerProps,
	DateValidationError,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

export type TDatePickerProps = DatePickerProps<any> & {
	placeholder?: string;
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
