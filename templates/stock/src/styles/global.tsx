// src/styles/global.tsx
'use client';
import { Global, css } from '@emotion/react';

export function GlobalStyles() {
	return (
		<Global
			styles={css`
				:root {
					/* Base */
					--background: #f5f7fb;
					--foreground: #0f172a;

					--text-primary: #0f172a;
					--text-secondary: #64748b;
					--text-muted: #94a3b8;

					--border-subtle: #e2e8f0;

					--header-bg: #ffffff;
					--footer-bg: #ffffff;

					/* Primary (base do sistema) */
					--color-primary-01: #6366f1; /* Azul escuro elegante */
					--color-primary-02: #818cf8;

					/* Accent / Secondary */
					--color-secundary-01: #6366f1; /* Indigo SaaS */
					--color-secundary-02: #818cf8;
					--color-secundary-03: #c7d2fe;

					--color-secundary-04: #334155;
					--color-secundary-05: #64748b;
					--color-secundary-06: #e2e8f0;

					/* Neutros refinados */
					--color-neutral-01: #ffffff;
					--color-neutral-02: #f1f5f9;
					--color-neutral-03: #e2e8f0;
					--color-neutral-04: #cbd5e1;
					--color-neutral-05: #64748b;
					--color-neutral-06: #0f172a;
					--color-neutral-07: #94a3b8;

					/* Estados */

					/* Success */
					--color-success-01: #ecfdf5;
					--color-success-02: #10b981;
					--color-success-03: #047857;

					/* Warning */
					--color-alert-01: #fffbeb;
					--color-alert-02: #f59e0b;
					--color-alert-03: #b45309;

					/* Urgent */
					--color-urgent-01: #fef2f2;
					--color-urgent-02: #ef4444;
					--color-urgent-03: #b91c1c;

					/* Info */
					--color-suport-azul-01: #3b82f6;
					--color-suport-azul-02: #1d4ed8;
					--color-suport-azul-03: #bfdbfe;
					--color-suport-azul-04: #eff6ff;

					/* Layout */
					--main-color-bg: #f5f7fb;
					--header-color-bg: #ffffff;

					--menu-color-bg: #292d43;
					--menu-color-fg: #cbd5e1;
					--menu-color-active: #6366f1;
				}

				@theme inline {
					--color-background: var(--background);
					--color-foreground: var(--foreground);
					--font-sans: var(--font-geist-sans);
					--font-mono: var(--font-geist-mono);
				}

				@media (prefers-color-scheme: dark) {
					:root {
						--background: #f2f2f2;
						--foreground: #d2d2d2;
					}
				}
				html {
					overflow: hidden;
					font-size: 90% !important;
				}
				p,
				div,
				button {
					font-size: 14px !important;
				}
				html,
				body {
					height: 100%;
				}

				* {
					font-family: Montserrat !important;
				}

				body {
					background: var(--main-color-bg) !important;
					color: var(--foreground);
					margin: 0;
					padding: 0;
					font-family: var(--font-montserrat);
				}

				.MuiButton-contained {
					max-height: 40px !important;
				}

				.MuiPagination-ul {
					list-style: none !important;
				}

				@layer utilities {
					.text-balance {
						text-wrap: balance;
					}
				}

				/** Switch */
				.MuiSwitch-root {
					/* background-color: red !important; */
					width: 40px !important;
					height: 20px !important;
					border-radius: 9px !important;
					padding: 0px 0px !important;
					display: 'flex' !important;
					margin: 0px 8px !important;
				}

				.MuiSwitch-root:active .MuiSwitch-thumb {
					width: 18px !important;
				}

				.MuiSwitch-root:active .MuiSwitch-switchBase.Mui-checked {
					transform: translateX(12px) !important;
				}

				.MuiSwitch-root .MuiSwitch-switchBase {
					padding: 2px !important;
				}

				.MuiSwitch-root .MuiSwitch-switchBase.Mui-checked {
					transform: translateX(20px) !important;
					color: var(--color-neutral-01) !important;
				}

				.MuiSwitch-root
					.MuiSwitch-switchBase.Mui-checked
					+ .MuiSwitch-track {
					opacity: 1 !important;
					background-color: var(--color-secundary-01) !important;
				}

				.MuiSwitch-root .MuiSwitch-thumb {
					box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2) !important;
					width: 12px !important;
					height: 12px !important;
					border-radius: 6px !important;
					transition: width 0.2s ease-in-out !important;
					transform: translate(2px, 2px) !important;
				}

				.MuiSwitch-root .MuiSwitch-track {
					border-radius: 16px !important;
					opacity: 1 !important;
					background-color: var(--color-neutral-02) !important;
					box-sizing: border-box !important;
				}
			`}
		/>
	);
}
