import React, { forwardRef } from 'react';
import styles from './styles.module.css';
import { RowProps } from '@/_types/responsive';

const Row = forwardRef<HTMLDivElement, React.PropsWithChildren<RowProps>>(
	(
		{
			children,
			sm,
			md,
			lg,
			xl,
			style,
			...rest
		}: React.PropsWithChildren<RowProps>,
		ref,
	) => {
		const [hasRowAbove, setHasRowAbove] = React.useState(false);
		const [hasRowBelow, setHasRowBelow] = React.useState(false);
		const rowRef = React.useRef<HTMLDivElement | null>(null);

		React.useEffect(() => {
			if (rowRef.current) {
				const prevSibling = rowRef.current
					.previousElementSibling as HTMLElement | null;
				const nextSibling = rowRef.current
					.nextElementSibling as HTMLElement | null;
				setHasRowAbove(!!prevSibling);
				setHasRowBelow(!!nextSibling);
			}
		}, []);

		return (
			<div
				ref={(node) => {
					rowRef.current = node;
					if (typeof ref === 'function') {
						ref(node);
					} else if (ref) {
						(
							ref as React.MutableRefObject<HTMLDivElement | null>
						).current = node;
					}
				}}
				className={`
          ${styles.row} 
          ${hasRowAbove ? styles['row-has-above'] : styles['row-no-above']} 
          ${hasRowBelow && styles['row-has-below']} 
          ${sm && styles['row-sm']}
          ${md && styles['row-md']}
          ${lg && styles['row-lg']}
          ${xl && styles['row-xl']}
          ${rest['2xl'] && styles['row-2xl']}
        `}
				style={
					{
						'--sm': sm,
						'--md': md,
						'--lg': lg,
						'--xl': xl,
						'--2xl': rest['2xl'],
						...style,
					} as React.CSSProperties
				}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

export { Row };
