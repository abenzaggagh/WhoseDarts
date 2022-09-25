export interface Player {
  index: number;
  firstName: string;
  lastName: String;
  username: String;
}

export interface Codable {
  code: string,
  name: string
}

export interface Game {
  name: string,
  code: Games
}

export enum Games {
  DARTS_301 = "301",
  DARTS_501 = "501",
  DARTS_701  = "701",
  DARTS_1001 = "1001",
  CRICKET = "CRICKET",
  PARCHESS = "PARCHESS",
  HIGH_SCORE = "HIGH_SCORE",
  BOB_S_27 = "BOB_S_27",
  BARMOUDA = "BARMOUDA",
  FOOTBALL = "FOOTBALL"
}

export interface WhoseDarts {
  game: string;
  players: Player[]
  nbTours: string;
  modeDeJeu?: String;
  checkIn?: String;
  checkOut?: String;
}

export interface Round {
  firstDart: string;
  secondDart: string;
  thirdDart: string;
}
