import {Player} from "./whose-darts.model";

export class _Game {
  players: Player[] = [];
  leg: number = 1;
  set: number = 1;
  stats: any = {}
}

export class Cricket extends _Game {

}

export class CricketNormal extends Cricket {

}

export class CricketNonScore extends Cricket {

}

export class CricketFou extends Cricket {

}


