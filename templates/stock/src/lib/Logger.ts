
export const logLevels = ['info', 'debug', 'warn', 'err'] as const;
export type LogLevel = (typeof logLevels)[number];

const isDevelopment = process.env.NODE_ENV === 'development';

const allowedLogLevels: Set<LogLevel> = isDevelopment
	? new Set(['info', 'debug', 'warn', 'err'])
	: new Set(['err']);

export type Logger = {
	[key in LogLevel]: (message: unknown, force?: boolean) => void;
};

export default logLevels.reduce<Logger>((exports, logLevel) => {
	exports[logLevel] = (message: unknown, force = false) =>
		(force || logLevel in allowedLogLevels) && console.log(message);
	return exports;
}, {} as Logger);
