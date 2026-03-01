'use client';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AppsIcon from '@mui/icons-material/Apps';

import {
	Card,
	GradientSpinner,
	IconWrapper,
	LoadingOverlay,
	ModuleDescription,
	ModuleTitle,
} from './styles';

type ModuleProps = {
	title: string;
	description: string;
	onClick: () => void;
	isLoading?: boolean;
};

const iconMap: Record<string, React.ReactNode> = {
	Administrativo: <AdminPanelSettingsIcon />,
	Amostra: <CategoryIcon />,
	Agendamento: <EventAvailableIcon />,
	Inventário: <WarehouseIcon />,
	Antecipação: <AssignmentReturnIcon />,
};

export const Module = ({
	description,
	onClick,
	title,
	isLoading,
}: ModuleProps) => {
	const icon = iconMap[title] ?? <AppsIcon />;

	return (
		<Card onClick={!isLoading ? onClick : undefined} loading={isLoading}>
			<IconWrapper>{icon}</IconWrapper>

			<ModuleTitle>{title}</ModuleTitle>
			<ModuleDescription>{description}</ModuleDescription>

			{isLoading && (
				<LoadingOverlay>
					<GradientSpinner />
				</LoadingOverlay>
			)}
		</Card>
	);
};
