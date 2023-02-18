export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type CollectionMoviesBelong = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type GenresMoviesType = {
  id: number;
  name: string;
};
export type ProductionCompaniesType = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};
export type ProductionCountriesType = {
  iso_3166_1: string;
  name: string;
};
type SpokenLanguagesType = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MoviesTypes = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: CollectionMoviesBelong;
  budget: number;
  genres: GenresMoviesType[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesType[];
  production_countries: ProductionCountriesType[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesType[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchTrendingMovieParams = {
  url: string;
};
export type SearchMovieActorsParams = {
  urlActors: string;
};

export interface moviesSectionSliceState {
  movie: MoviesTypes | undefined;
  status: Status;
  cast: ActorsType[];
}

type ActorsType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_nam: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
type CrewType = {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type MovieActorsType = {
  cast: ActorsType[];
};
