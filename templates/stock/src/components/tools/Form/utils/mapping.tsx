import { FieldValues } from 'react-hook-form';
import { Grid } from '@mui/material';

import { Input as InputProps } from '../types/form.type';

import { Input, Select, SearchInput, Switch } from '../components';

export const getInput = <T extends FieldValues>(
	input: InputProps<T>,
	index: number,
) => {
	switch (input.type) {
		case 'email':
		case 'number':
		case 'text':
		case 'password':
			return (
				<Grid {...input.grid} key={index}>
					<Input {...input} />
				</Grid>
			);
		case 'search':
			return (
				<Grid {...input.grid} key={index}>
					<SearchInput {...input} />
				</Grid>
			);
		case 'select':
			return (
				<Grid {...input.grid} key={index}>
					<Select {...input} />
				</Grid>
			);
		case 'switch':
			return (
				<Grid {...input.grid} key={index}>
					<Switch {...input} />
				</Grid>
			);

		default:
			return null;
	}
};
