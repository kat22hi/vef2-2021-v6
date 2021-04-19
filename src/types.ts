// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti
// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti
export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
}

export interface IFilm {
  id: string;
  title?: string;
  openingCrawl?: string;
  episodeID?: number;
  characterConnection?: ICharacterConnection;
}

export interface ICharacterResponse {
  person: ICharacter;
}

interface IAllFilms {
  films?: Array<IFilm>;
}

export interface IFilmResponse {
  allFilms?: IAllFilms;
}

interface ICharacterConnection {
  characters?: Array<ICharacter>;
}

interface IPageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface IPeopleResponse {
  allPeople?: IPeople;
}

interface IPeople {
  pageInfo?: IPageInfo;
  people?: Array<ICharacter>;
}
