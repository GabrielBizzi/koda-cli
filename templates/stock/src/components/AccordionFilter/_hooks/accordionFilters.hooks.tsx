import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { IAccordionFiltersProps } from '../_types.hooks';
import { UseFormReturn } from 'react-hook-form';

export function useAccordionFiltersHooks({
	guid,
	closable,
	defaultOpened,
	onClose,
	onOpen,
	setValueTab,
	form,
	onChange,
}: Partial<IAccordionFiltersProps> & { guid: string }) {
	const [expanded, setExpanded] = useState<string | false>(false);
	const { watch } = form as UseFormReturn<any>;

	useEffect(() => {
		if (defaultOpened) {
			setExpanded(guid);
			onOpen?.(guid);
		}
	}, [defaultOpened, guid, onOpen]);

	const on = useCallback(
		(guid: string, callback?: (guid: string) => any) =>
			(_event: SyntheticEvent, isExpanded: boolean) => {
				if (!closable) return;
				if (callback) callback?.(guid);
				setExpanded(isExpanded ? guid : false);

				if (isExpanded) {
					onOpen?.(guid);
				} else {
					onClose?.(guid);
				}
			},
		[closable, onClose, onOpen],
	);

	const countFilledValues = useCallback((value: any): any => {
		if (value === null || value === undefined || value === '') return 0;
		if (typeof value !== 'object') return 1;

		if (Array.isArray(value)) {
			return value.reduce((acc, v) => acc + countFilledValues(v), 0);
		}

		return Object.values(value).reduce(
			(acc: any, v) => acc + countFilledValues(v),
			0,
		);
	}, []);

	const filledFiltersCount: any = useMemo(() => {
		const values = form?.getValues();

		return Object.values(values).reduce(
			(acc: any, v) => acc + countFilledValues(v),
			0,
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countFilledValues, form, watch()]);

	function a11yProps(index: number) {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`,
		};
	}
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValueTab?.(newValue);
	};

	const toggleAccordion = () => {
		const isExpanded = expanded !== guid;
		on(guid, onChange)({} as SyntheticEvent, isExpanded);
	};

	return {
		handleChange,
		expanded,
		on,
		a11yProps,
		filledFiltersCount,
		toggleAccordion,
	};
}
