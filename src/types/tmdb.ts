export interface Genre {
	id: number;
	name: string;
}

export interface Series {
	id: string;
	name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	genre_ids: number[];
	vote_average: number;
	vote_count: number;
	origin_country: string[];
  popularity: number;
}

export interface SeriesDetails extends Series {
	status: string;
	first_air_date: string;
	last_air_date: string;
	number_of_seasons: number;
	number_of_episodes: number;
	seasons: Season[];
	genres: Genre[];
}

export interface Season {
	season_number: number;
	episode_count: number;
}

export interface Trailer {
	key: string;
	site: string;
	type: string;
}

export interface TMDBPaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
