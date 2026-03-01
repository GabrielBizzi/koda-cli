import React, { forwardRef } from 'react';
import styles from './styles.module.css';
import { ColProps } from '@/_types/responsive';

const Col = forwardRef<HTMLDivElement, React.PropsWithChildren<ColProps>>(
  (
    {
      sm = 12,
      md = 12,
      lg = 12,
      xl = 12,
      children,
      ...rest
    }: React.PropsWithChildren<ColProps>,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.col} ${styles['col-sm']} ${styles['col-md']} ${styles['col-lg']} ${styles['col-xl']}`}
        style={
          {
            '--sm': sm,
            '--md': md,
            '--lg': lg,
            '--xl': xl,
          } as React.CSSProperties
        }
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export { Col };
