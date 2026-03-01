export type ApiResponse<T = any> = {
	meta: Meta;
	data: T[];
};

export type ApiResponseObj<T> = {
	meta: Meta;
	data: T;
};

type RouteObject = {
	pathname: string;
	query: object;
};

export type Meta = {
	total: number;
	per_page: number;
	current_page: number;
	next_page_url: string | RouteObject | null;
	previous_page_url: string | RouteObject | null;
	last_page: number;
};

export type ApiResponseCreated<T = any> = {
	data: T;
	status: number;
	statusText: string;
};
