export type ReleaseType = 'feature' | 'improvement' | 'bug' | 'breaking';

export interface ReleaseNote {
	id: string;
	type: ReleaseType;
	description: string;
}

export interface ReleaseVersion {
	version: string;
	title: string;
	description: string;
	force?: boolean;
	notes: ReleaseNote[];
}

export const releases: ReleaseVersion[] = [];
