'use client';
import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/pt-br';

const theme = createTheme({
	typography: {
		fontFamily: 'var(--font-montserrat)',
		fontSize: 14,
		button: { textTransform: 'none', fontWeight: 500 },
	},

	palette: {
		mode: 'light',
		primary: {
			main: '#6366F1',
		},
		secondary: {
			main: '#F1F5F9',
		},
		background: {
			default: '#F5F7FB',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#0F172A',
			secondary: '#64748B',
		},
	},

	shape: {
		borderRadius: 12,
	},

	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					backgroundColor: '#FFFFFF',
					transition: 'all 0.2s ease',
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#CBD5E1',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#6366F1',
						borderWidth: 2,
					},
				},
				notchedOutline: {
					borderColor: '#E2E8F0',
				},
			},
		},

		MuiInputBase: {
			styleOverrides: {
				root: {
					backgroundColor: '#FFFFFF',
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root: {
					padding: '0.65rem 1.5rem',
					borderRadius: 12,
					boxShadow: 'none',
					fontWeight: 500,
				},

				contained: {
					backgroundColor: '#6366F1',
					'&:hover': {
						backgroundColor: '#4F46E5',
						boxShadow: '0 6px 18px rgba(99, 102, 241, 0.25)',
					},
				},

				outlined: {
					borderColor: '#CBD5E1',
					'&:hover': {
						backgroundColor: '#F1F5F9',
					},
				},
			},
		},

		MuiDialog: {
			styleOverrides: {
				paper: {
					padding: '2rem',
					borderRadius: 16,
					boxShadow: '0 20px 60px rgba(15, 23, 42, 0.15)',
				},
			},
		},

		MuiDialogTitle: {
			styleOverrides: {
				root: {
					padding: 0,
					marginBottom: '1rem',
					fontSize: 20,
					fontWeight: 600,
					color: '#0F172A',
				},
			},
		},

		MuiDialogActions: {
			styleOverrides: {
				root: {
					justifyContent: 'flex-end',
					gap: '0.75rem',
					paddingTop: '1.5rem',
				},
			},
		},

		MuiTypography: {
			styleOverrides: {
				h2: {
					paddingBottom: '1.5rem',
					fontSize: 24,
					fontWeight: 600,
					lineHeight: 1.3,
					color: '#0F172A',
				},
			},
		},
	},
});

export default Theme;

function Theme({ children }: React.PropsWithChildren) {
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider
				adapterLocale="pt-BR"
				localeText={
					ptBR.components.MuiLocalizationProvider.defaultProps
						.localeText
				}
				dateAdapter={AdapterDayjs}
			>
				{children}
			</LocalizationProvider>
		</ThemeProvider>
	);
}
