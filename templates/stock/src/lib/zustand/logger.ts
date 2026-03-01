import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import logger from '../Logger';

type Logger = <
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
    f: StateCreator<T, Mps, Mcs>,
    name?: string,
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
    f: StateCreator<T, [], []>,
    name?: string,
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
    const setState = store.setState;
    const getState = store.getState;

    store.setState = (...a) => {
        setState(...a);
        logger.info(
            `${name ? `[${name}:SET]` : '[Zustant:SET]'} ${JSON.stringify(getState())}`,
        );
    };
    store.getState = (...a) => {
        logger.info(
            `${name ? `[${name}:GET]` : '[Zustant:GET]'} ${JSON.stringify(getState())}`,
        );
        return getState(...a);
    };

    return f(set, get, store);
};

export const ZustandLogger = loggerImpl as Logger;
