import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../services/GameService";
import {Player, Round, WhoseDarts} from "../../models/whose-darts.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  // TODO: move to a seperate component
  // Start of TODO ******************************
  seconds: number = 0;
  minutes: number = 0;

  startChrono() {
    setInterval(() =>  {
      this.seconds++;
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }, 1000);
  }
  // END of TODO ******************************

  // TODO : create a pipe to add the leading zero
  addLeadingZero(value: number) : string {
    if (value <= 9) {
      return "0" + String(value);
    } else {
      return String(value);
    }
  }

  isDouble: boolean = false;
  isTriple: boolean = false;

  firstDart?: string;
  secondDart?: string;
  thirdDart?: string;

  factory?: string;

  currentRoundDartsScore: number = 0;

  currentRound: number = 1;
  currentPlayerIndexInRound: number = 1;

  scores: Map<Player, Array<Round>> = new Map<Player, Array<Round>>();

  rounds: Round[] = [];
  nbTotalDeTour?: number;

  whoseDartsGame?: WhoseDarts;

  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.whoseDartsGame = this.gameService.getGame();
    if (this.whoseDartsGame.game == "") {
      this.router.navigate(['/games']).then(r => r);
    } else {
      switch (this.whoseDartsGame.game) {
        case "301":
          this.whoseDartsGame.players.forEach(player => player.score = 301);
          break;
        case "501":
          this.whoseDartsGame.players.forEach(player => player.score = 501);
          break;
        case "701":
          this.whoseDartsGame.players.forEach(player => player.score = 701);
          break;
        case "1001":
          this.whoseDartsGame.players.forEach(player => player.score = 1001);
          break;
        case "CRICKET":
          this.whoseDartsGame.players.forEach(player => player.score = 0);
          break;
        case "PARCHESS":
          this.whoseDartsGame.players.forEach(player => player.score = 0);
          break;
      }
      this.whoseDartsGame.players.forEach(player => {
        this.scores.set(player, []);
      });
    }
    this.nbTotalDeTour = parseInt(this.whoseDartsGame.nbTours);
    this.startChrono();
  }

  isAllDartsSet() : boolean {
    return (this.firstDart != undefined && this.toDartsValue(this.firstDart) >= 0)
      && (this.secondDart != undefined && this.toDartsValue(this.firstDart) >= 0)
      && (this.thirdDart != undefined && this.toDartsValue(this.firstDart) >= 0);
  }

  toDartsValue(dart: string) : number {
    if (dart.startsWith('T')) {
      return Number(dart.slice(1)) * 3;
    } else if (dart.startsWith('D')) {
      return Number(dart.slice(1)) * 2;
    } else {
      return Number(dart);
    }
  }

  toDarts(dartValue: number) : string {
    if (this.isTriple) {
      return 'T' + String(dartValue);
    } else if (this.isDouble) {
      return 'D' + String(dartValue);
    }
    return String(dartValue);
  }

  toCricketMarks(dartValue: number) : number {
    if (this.isTriple) {
      return 3;
    } else if (this.isDouble) {
      return 2;
    }
    return 1;
  }

  darts(dartValue: number) {

    if (this.whoseDartsGame?.game != 'CRICKET') {
      if (this.firstDart == undefined) {
        this.firstDart = this.toDarts(dartValue);
        this.calcCurrentRoundDartsScore();
        this.checkWinner();
      } else if (this.toDartsValue(this.firstDart) >= 0 && this.secondDart == undefined) {
        this.secondDart = this.toDarts(dartValue);
        this.calcCurrentRoundDartsScore();
        this.checkWinner()
      } else if (this.toDartsValue(this.firstDart) >= 0 && (this.secondDart != undefined && this.toDartsValue(this.secondDart) >= 0) && this.thirdDart == undefined) {
        this.thirdDart = this.toDarts(dartValue);
        this.calcCurrentRoundDartsScore();
        this.checkWinner();
      }
    }

    if (this.whoseDartsGame?.game == 'CRICKET') {
      if (this.firstDart == undefined) {
        this.firstDart = this.toDarts(dartValue);
        if (this.whoseDartsGame.players[this.currentPlayerIndexInRound] && this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks) {
          if (Number(this.firstDart) > 0) {
            this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.set(String(dartValue), this.toCricketMarks(dartValue));
          }
        }
      } else if (this.toDartsValue(this.firstDart) >= 0 && this.secondDart == undefined) {
        this.secondDart = this.toDarts(dartValue);
        console.log(this.secondDart);
      } else if (this.toDartsValue(this.firstDart) >= 0 && (this.secondDart != undefined && this.toDartsValue(this.secondDart) >= 0) && this.thirdDart == undefined) {
        this.thirdDart = this.toDarts(dartValue);
        console.log(this.thirdDart);
      }
    }

    this.isDouble = false;
    this.isTriple = false;

  }

  checkWinner() {
    if (this.whoseDartsGame?.players) {
      const currentPlayer = this.whoseDartsGame?.players.find(player => player.index === this.currentPlayerIndexInRound);
      if (currentPlayer && (currentPlayer.score - this.currentRoundDartsScore == 0)) {
        alert('Winner Winner Dinner Chicken');
      }
    }
  }

  calcCurrentRoundDartsScore() {
    if (this.firstDart) {
      this.currentRoundDartsScore = this.toDartsValue(this.firstDart);
    }
    if (this.firstDart && this.secondDart) {
      this.currentRoundDartsScore = this.toDartsValue(this.firstDart) + this.toDartsValue(this.secondDart);
    }
    if (this.firstDart && this.secondDart && this.thirdDart) {
      this.currentRoundDartsScore = this.toDartsValue(this.firstDart) + this.toDartsValue(this.secondDart) + this.toDartsValue(this.thirdDart);
    }
  }

  next() {
    if (this.nbTotalDeTour && this.currentRound < this.nbTotalDeTour) {
      this.rounds.push({
        firstDart: this.firstDart!,
        secondDart: this.secondDart!,
        thirdDart: this.thirdDart!
      });

      const currentPlayer = this.whoseDartsGame?.players.find(player => player.index === this.currentPlayerIndexInRound);

      if (currentPlayer) {
        if ((currentPlayer.score - this.currentRoundDartsScore) > 0) {
          currentPlayer.score = currentPlayer.score - this.currentRoundDartsScore;
        }
      }

      this.currentRoundDartsScore = 0;
      this.resetDarts();
    }

    this.nextPlayer();
  }

  resetDarts() {
    this.firstDart = undefined;
    this.secondDart = undefined;
    this.thirdDart = undefined;
  }

  allPlayersDidPlay() {
    return false;
  }

  back() {
    if (this.firstDart && this.secondDart && this.thirdDart &&
      this.toDartsValue(this.firstDart) >= 0 && this.toDartsValue(this.secondDart) >= 0 && this.toDartsValue(this.thirdDart) >= 0) {
      this.thirdDart = undefined;
    } else if (this.thirdDart == undefined && (this.secondDart && this.toDartsValue(this.secondDart) >= 0)) {
      this.secondDart = undefined;
    } else if (this.thirdDart == undefined && this.secondDart == undefined && (this.firstDart && this.toDartsValue(this.firstDart) >= 0)) {
      this.firstDart = undefined;
    }
    this.calcCurrentRoundDartsScore();
  }

  nextPlayer() {
    if (this.whoseDartsGame && this.whoseDartsGame.players) {
      if (this.currentPlayerIndexInRound < this.whoseDartsGame.players.length) {
        this.currentPlayerIndexInRound++;
      } else {
        this.currentRound++;
        this.currentPlayerIndexInRound = 1;
      }
    }
  }

  nextRound() {

  }

  previousRound() {

  }

  double() {
    if (this.isDouble) {
      this.isDouble = false;
    } else {
      this.isDouble = true;
      this.isTriple = false;
    }
  }

  triple() {
    if (this.isTriple) {
      this.isTriple = false;
    } else {
      this.isTriple = true;
      this.isDouble = false;
    }
  }

  exit() {
    this.router.navigate(['/games']).then(r => r);
  }

}
