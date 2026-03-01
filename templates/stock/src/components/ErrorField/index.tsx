import { ErrorMessage } from './styles';

type KeyValidation =
	| {
			message?: string;
	  }
	| string
	| React.ReactNode
	| React.Key
	| any;

type TErrorField = {
	error: KeyValidation;
};

export const ErrorField = ({ error }: TErrorField) => {
	return (
		<>
			{error ? (
				<>
					<ErrorMessage>{error ? error : ''}</ErrorMessage>
				</>
			) : null}
		</>
	);
};
