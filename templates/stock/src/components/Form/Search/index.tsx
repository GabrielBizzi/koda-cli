import { TableDialog } from '@/components/TableSetup';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, CircularProgress, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { SvgIcon } from '@mui/material';
import React from 'react';
import { GearButton, WrapperSearch } from './styles';
import {
	defaultValuesGear,
	defaultValuesSearch,
	TSearchProps,
} from './types.zod';
import { usePagination } from '@/context/pagination.context';

export const SearchButton = <T extends object>({
	onClickSearch,
	searchButtonProps,
	hasGearButton,
	exportable,
	onExport,
	gearButtonProps,
	dialogProps,
}: TSearchProps<T>) => {
	const [showTableDialog, setShowTableDialog] = React.useState(false);
	const { size } = usePagination();

	const toggleTableDialogVisiblity = React.useCallback(() => {
		setShowTableDialog((prev) => !prev);
	}, []);

	const [exporting, setExporting] = React.useState(false);

	const handleExport = React.useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			setExporting(true);
			try {
				await onExport?.(e);
			} finally {
				setExporting(false);
			}
		},
		[onExport],
	);

	return (
		<>
			<WrapperSearch>
				<Button
					fullWidth
					variant="contained"
					{...defaultValuesSearch}
					{...searchButtonProps}
					onClick={onClickSearch}
					sx={{
						height: 40,
						px: 3,
						fontSize: '0.875rem',
						fontWeight: 500,
						textTransform: 'none',
						background: '#6366F1',
						boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
						transition: 'all 0.2s ease',

						'&:hover': {
							background: '#4F46E5',
							boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
						},

						'&:active': {
							transform: 'translateY(0)',
							boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
						},
					}}
				>
					{searchButtonProps?.text ?? defaultValuesSearch?.text}
				</Button>

				{exportable ? (
					<GearButton>
						<IconButton
							aria-label={defaultValuesGear.text}
							disabled={exporting}
							{...gearButtonProps}
							onClick={handleExport}
						>
							{exporting ? (
								<CircularProgress
									color="inherit"
									sx={{ m: 0.75 }}
									size={20}
								/>
							) : (
								<FileDownloadIcon />
							)}
						</IconButton>
					</GearButton>
				) : null}

				{hasGearButton ? (
					<GearButton>
						<IconButton
							aria-label={defaultValuesGear.text}
							{...defaultValuesGear}
							{...gearButtonProps}
							onClick={(event) => {
								gearButtonProps?.onClick?.(event);
								toggleTableDialogVisiblity();
							}}
							sx={{ color: '#fff' }}
						>
							<SvgIcon component={SettingsIcon} inheritViewBox />
						</IconButton>
					</GearButton>
				) : null}
			</WrapperSearch>

			{hasGearButton ? (
				<TableDialog
					open={showTableDialog}
					setOpen={setShowTableDialog}
					onCancel={() => {
						dialogProps?.onCancel?.();
						toggleTableDialogVisiblity();
					}}
					onCommit={({ columns, pagination }) => {
						dialogProps?.onCommit?.({ columns, pagination });
					}}
					columns={dialogProps?.columns!}
					currentPageSize={+size!}
					{...dialogProps}
				/>
			) : null}
		</>
	);
};
