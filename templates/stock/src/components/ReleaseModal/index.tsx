'use client';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
	Box,
	Typography,
	IconButton,
} from '@mui/material';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BugReportIcon from '@mui/icons-material/BugReport';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import { ReleaseType } from '@/release/release';

interface Props {
	open: boolean;
	onClose: () => void;
	release: any;
}

function getIcon(type: ReleaseType) {
	switch (type) {
		case 'feature':
			return <AutoAwesomeIcon sx={{ color: '#6366f1' }} />;
		case 'improvement':
			return <UpgradeIcon sx={{ color: '#22c55e' }} />;
		case 'bug':
			return <BugReportIcon sx={{ color: '#f59e0b' }} />;
		case 'breaking':
			return <WarningAmberIcon sx={{ color: '#ef4444' }} />;
	}
}

export function ReleaseModal({ open, onClose, release }: Props) {
	if (!release) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			PaperProps={{
				sx: {
					padding: 2,
					background: '#ffffff',
					position: 'relative',
				},
			}}
		>
			{/* Close Button */}
			<IconButton
				onClick={onClose}
				sx={{
					position: 'absolute',
					top: 16,
					right: 16,
					color: '#94a3b8',
				}}
			>
				<CloseIcon />
			</IconButton>

			{/* Top Icon */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mb: 2,
				}}
			>
				<Box
					sx={{
						width: 64,
						height: 64,
						borderRadius: '50%',
						background: '#f59e0b',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 8px 20px rgba(245,158,11,0.35)',
					}}
				>
					<Typography
						sx={{
							color: '#ffffff',
							fontSize: 32,
							fontWeight: 700,
						}}
					>
						!
					</Typography>
				</Box>
			</Box>

			{/* Title */}
			<DialogTitle
				sx={{
					textAlign: 'center',
					fontSize: 24,
					fontWeight: 700,
					color: '#0f172a',
					paddingBottom: 1,
				}}
			>
				{release.title}
			</DialogTitle>

			{/* Subtitle */}
			<Typography
				sx={{
					textAlign: 'center',
					color: '#475569',
					fontSize: 15,
					fontWeight: 400,
					mb: 3,
				}}
			>
				Uma nova versão <b>v({release.version})</b> está disponível com
				novas funcionalidades e melhorias de desempenho.
			</Typography>

			{/* Extra description */}
			<Typography
				sx={{
					textAlign: 'center',
					color: '#64748b',
					fontSize: 14,
					mb: 3,
				}}
			>
				{release.description}
			</Typography>

			{/* Notes Card */}
			<DialogContent
				sx={{
					background: '#f8fafc',
					borderRadius: '16px',
					padding: 3,
					maxHeight: 400,
					overflowY: 'auto',

					/* Scroll elegante SaaS */
					'&::-webkit-scrollbar': {
						width: 6,
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#cbd5e1',
						borderRadius: 10,
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: '#94a3b8',
					},
				}}
			>
				{release.notes.map((note: any) => (
					<Box
						key={note.id}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							mb: 2,
						}}
					>
						{getIcon(note.type)}
						<Typography
							sx={{
								color: '#334155',
								fontSize: 14,
								fontWeight: 500,
							}}
						>
							{note.description}
						</Typography>
					</Box>
				))}
			</DialogContent>

			{/* Actions */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 2,
					mt: 4,
				}}
			>
				<Button
					variant="outlined"
					onClick={onClose}
					sx={{
						borderRadius: '10px',
						textTransform: 'none',
						fontWeight: 500,
						borderColor: '#cbd5e1',
						color: '#475569',
						paddingY: 0,
						paddingX: 3,
						'&:hover': {
							borderColor: '#94a3b8',
							background: '#f1f5f9',
						},
					}}
				>
					Mais tarde
				</Button>

				<Button
					variant="contained"
					onClick={onClose}
					sx={{
						borderRadius: '10px',
						textTransform: 'none',
						paddingY: 1,
						fontWeight: 600,
						paddingX: 4,
						background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
						boxShadow: '0 8px 20px rgba(99,102,241,0.35)',
						'&:hover': {
							background:
								'linear-gradient(135deg,#4f46e5,#4338ca)',
						},
					}}
				>
					Entendi
				</Button>
			</Box>
		</Dialog>
	);
}
