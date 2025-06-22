export interface Genre {
	id: number;
	name: string;
}

export interface Series {
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	genre_ids: number[];
	first_air_date: string;
	last_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface SeriesDetails extends Series {
	status: string;
	number_of_seasons: number;
	number_of_episodes: number;
	seasons: Season[];
	genres: Genre[];
}

export interface Season {
	season_number: number;
	episode_count: number;
}

export interface TMDBPaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
