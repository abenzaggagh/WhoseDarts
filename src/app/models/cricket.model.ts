
export interface GameState {

}

export abstract class Game {

  currentRound: number;

  players: Players<Player>;

  stats: GameState[] = [];

  constructor(players: Players<Player>) {
    this.players = players;
    this.currentRound = 1;
  }

  abstract start()  : void;
  abstract end()    : void;

  abstract nextPlayer() : void;
  abstract previousPlayer() : void;

  abstract nextRound() : void;
  abstract previousRound() : void;

}

export abstract class Player {

  index       : number
  firstName   : string;
  lastName    : string;
  username    : string;

  protected constructor(index: number,
                        firstName: string,
                        lastName: string,
                        username: string) {
    this.index = index;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
  }

}

export class Players<Type extends Player> {

  players: Array<Type> = [];

  addPlayer(player: Type) {
    this.players.push(player);
  }

  removePlayer(playerIndex: number) {
    this.players.splice(playerIndex, 1);
  }

  getPlayers() : Map<number, Player> {
    const playersMap = new Map<number, Player>();

    this.players.forEach((player, index) => {
      player.index = index;
      playersMap.set(index, player);
    });

    return playersMap;
  }

}




export enum DartFactor {
  TRIPLE = 3,
  DOUBLE = 2,
  SIMPLE = 1
}
export interface DartScore {

  dartFactor: DartFactor,
  score : number

}

export class Dart {

  factor: DartFactor;
  point: number;

  constructor(factor: DartFactor, point: number) {
    this.factor = factor;
    this.point = point;
  }

  getValue() : number {
    return this.point * this.factor.valueOf()
  }

}

export abstract class RoundScore {

  firstDart : string;
  secondDart : string;
  thirdDart : string;

  protected constructor(firstDart: string, secondDart: string, thirdDart: string) {
    this.firstDart = firstDart;
    this.secondDart = secondDart;
    this.thirdDart = thirdDart;
  }

  allDarts() : Array<String> {
    return [this.firstDart, this.secondDart, this.thirdDart];
  }

}

export abstract class _RoundScore {

  firstDart : Dart;
  secondDart : Dart;
  thirdDart : Dart;

  protected constructor(firstDart: Dart, secondDart: Dart, thirdDart: Dart) {
    this.firstDart = firstDart;
    this.secondDart = secondDart;
    this.thirdDart = thirdDart;
  }

  allDarts() : Array<Dart> {
    return [this.firstDart, this.secondDart, this.thirdDart];
  }

}

export abstract class Round {

  index: number;

  playersRoundScore: Map<number, RoundScore>

  constructor(index: number, roundScore: Map<number, RoundScore>) {
    this.index = index;
    this.playersRoundScore = roundScore;
  }

  getPlayerScore(playerIndex: number) : RoundScore | undefined {
    return this.playersRoundScore.get(playerIndex);
  }

  abstract setPlayerScore(playerIndex: number, score: RoundScore) : Map<number, RoundScore>

}










export class X01Player extends Player {

  currentScore : number = 0;

  constructor(index: number,
              firstName: string,
              lastName: string,
              username: string) {
    super(index, firstName, lastName, username);
  }

}

export enum X01ModeEnum {
  DARTS_301   = 301,
  DARTS_501   = 501,
  DARTS_701   = 701,
  DARTS_1001  = 1001,
}

export class X01 extends Game {

  gameMode: X01ModeEnum;

  constructor(players: Players<X01Player>,
              gameMode: X01ModeEnum) {
    super(players);
    this.gameMode = gameMode;
  }

  start() : void | Error {
    if ( this.players == undefined ) {
      return new Error("Number of players can't be 0");
    }

    if ( this.gameMode === undefined ) {
      return new Error("Game mode must be chosen");
    }

    this.players.players

  }

  end(): void {

  }

  nextPlayer(): void {

  }

  previousPlayer(): void {

  }

  previousRound(): void {

  }

  nextRound(): void {

  }

}



































/***
 * TODO: Change the variable name
 * */
export const CRICKET_NUMBERS = ['20', '19', '18', '17', '16', '15', '25'];

export abstract class Cricket extends Game {

  start() {

  }

  end() {

  }

}

export class CricketNormal extends Cricket {

  nextPlayer(): void {

  }

  nextRound(): void {

  }

  previousPlayer(): void {

  }

  previousRound(): void {

  }

}

export class CricketNonScore extends Cricket {

  nextPlayer(): void {

  }

  nextRound(): void {

  }

  previousPlayer(): void {

  }

  previousRound(): void {

  }

}

export class CricketFou extends Cricket {

  nextPlayer(): void {

  }

  nextRound(): void {

  }

  previousPlayer(): void {

  }

  previousRound(): void {

  }

  generateBoard() {

  }

}


