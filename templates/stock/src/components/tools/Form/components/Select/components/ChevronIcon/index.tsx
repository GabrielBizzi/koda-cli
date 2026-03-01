import { ExpandMore, ExpandLess } from '@mui/icons-material';

export const SelectIcon = ({
	open,
	error,
}: {
	open: boolean;
	error: boolean;
}) => {
	return (
		<>
			{open ? (
				<ExpandLess color={error ? 'error' : 'disabled'} />
			) : (
				<ExpandMore color={error ? 'error' : 'disabled'} />
			)}
		</>
	);
};
