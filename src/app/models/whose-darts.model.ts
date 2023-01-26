export interface Player {
  index: number;
  firstName: string;
  lastName: string;
  username: string;
  score: number;

  cricketMarks?: Map<string, number>
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
  GOLF = "GOLF",
  DARTS_301 = "301",
  DARTS_501 = "501",
  DARTS_701  = "701",
  DARTS_1001 = "1001",
  CRICKET = "CRICKET",
  PARCHESS = "PARCHESS",
  BOB_S_27 = "BOB_S_27",
  BARMOUDA = "BARMOUDA",
  FOOTBALL = "FOOTBALL",
  HIGH_SCORE = "HIGH_SCORE"
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


export enum GameTypeEnum {
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

export enum CricketModeEnum {
  CRICKET_NORMAL = "CRICKET_NORMAL",
  CRICKET_NO_SCORE = "CRICKET_NO_SCORE",
  CRICKET_FOU = "CRICKET_FOU",

}

export enum CheckInEnum {
  SINGLE_IN = "SINGLE_IN",
  DOUBLE_IN = "DOUBLE_IN",
  TRIPLE_IN = "TRIPLE_IN"
}

export enum CheckOutEnum {
  SINGLE_OUT = "SINGLE_OUT",
  DOUBLE_OUT = "DOUBLE_OUT",
  TRIPLE_OUT = "TRIPLE_OUT"
}
/*
export interface Game {
  players: Array<Player>
  set: number;
  leg: number;
  type: GameTypeEnum;
  mode: string;
  checkIn: CheckInEnum;
  checkOut: CheckOutEnum;
  rounds: number;
}


*/



export interface RoundScore {
  firstDart: string;
  secondDart: string;
  thirdDart: string;
}
