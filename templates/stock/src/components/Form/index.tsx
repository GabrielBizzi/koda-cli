import React, { HtmlHTMLAttributes } from 'react';

type TForm = HtmlHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, ...rest }: React.PropsWithChildren<TForm>) => {
	return <form {...rest}>{children}</form>;
};
