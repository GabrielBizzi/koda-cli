import { create } from 'zustand';
import { OptionsWithExtraProps, SnackbarMessage, VariantType } from 'notistack';

type MessageContext = {
	messages: (SnackbarMessage & { id: number })[];
	toast: <V extends VariantType>(
		props: OptionsWithExtraProps<V> & { message?: SnackbarMessage },
	) => void;
	read: () => SnackbarMessage[];
	clean: (id: number) => void;
};

export const useMessage = create<MessageContext>((set, get) => ({
	messages: [],
	toast: <V extends VariantType>(
		props: OptionsWithExtraProps<V> & { message?: SnackbarMessage },
	) => {
		const payload: any = props;
		payload['id'] = messages.length + 1;
		set((state) => ({
			messages: [...state.messages, payload],
		}));
	},
	read: () => get().messages,
	clean: (id: number) =>
		set((state) => ({
			messages: state.messages.filter((message) => message.id !== id),
		})),
}));

export const messages = () => {
	return (() => useMessage.getState())() as MessageContext;
};
