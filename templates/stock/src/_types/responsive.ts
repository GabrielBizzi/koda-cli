import { CSSProperties, HtmlHTMLAttributes } from 'react';

export type ResponsiveProp = number | undefined;

export interface RowProps extends HtmlHTMLAttributes<HTMLDivElement> {
  sm?: ResponsiveProp;
  md?: ResponsiveProp;
  lg?: ResponsiveProp;
  xl?: ResponsiveProp;
  '2xl'?: ResponsiveProp;
  hasRowAbove?: boolean;
  hasRowBelow?: boolean;
  style?: CSSProperties;
}

export interface ColProps extends HtmlHTMLAttributes<HTMLDivElement> {
  sm?: ResponsiveProp;
  md?: ResponsiveProp;
  lg?: ResponsiveProp;
  xl?: ResponsiveProp;
  '2xl'?: ResponsiveProp;
  style?: CSSProperties;
}
