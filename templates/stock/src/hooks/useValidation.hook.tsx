import React, { useRef } from 'react';
import { ZodSchema } from 'zod';

function useValidation<T>(schema: ZodSchema<T>, data: T) {
	const [errors, setErrors] = React.useState<Record<string, string>>({});
	const firstErrorRef = useRef<HTMLElement | null>(null);

	const validate = React.useCallback(() => {
		const result = schema.safeParse(data);
		if (!result.success) {
			const formErrors = result.error.issues.reduce(
				(acc, curr) => {
					acc[curr.path[0]] = curr.message;
					return acc;
				},
				{} as Record<string, string>,
			);

			setErrors(formErrors);

			const firstErrorKey = result.error.issues[0]?.path[0];
			if (firstErrorKey && firstErrorRef.current) {
				if (typeof firstErrorRef.current.focus === 'function') {
					firstErrorRef.current.focus();
				} else {
					const inputElement =
						firstErrorRef.current.querySelector('input');
					if (inputElement) {
						inputElement.focus();
					}

					firstErrorRef.current.focus();
				}
			}

			return false;
		}

		setErrors({});
		return true;
	}, [schema, data]);

	const registerRef = (name: string) => {
		if (typeof window !== 'undefined') {
			const element = window.document.getElementsByName(name)[0] as
				| HTMLInputElement
				| HTMLSelectElement
				| null;
			if (element) {
				firstErrorRef.current = element;
			}
		}
	};

	return { errors, validate, registerRef };
}

export default useValidation;
