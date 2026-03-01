import { AxiosError } from "axios";

export type ErrorDialogProps = React.PropsWithChildren<{
    open: boolean;
    title: string;
    width?: number;
    onClose?: () => void;
    err?: AxiosError;
    message?: string;
    onCommit?: () => void;
}>;
