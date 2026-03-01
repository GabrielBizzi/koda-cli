import React, { HtmlHTMLAttributes, forwardRef } from 'react';
import styled from './styles.module.css';

export type TGrid = HtmlHTMLAttributes<HTMLDivElement>;

const Grid = forwardRef<HTMLDivElement, React.PropsWithChildren<TGrid>>(
  ({ children, ...rest }, ref) => (
    <div ref={ref} className={styled.grid} {...rest}>
      {children}
    </div>
  ),
);

export { Grid };
