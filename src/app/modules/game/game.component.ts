import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../services/GameService";
import {Round, WhoseDarts} from "../../models/whose-darts.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  isDouble: boolean = false;
  isTriple: boolean = false;

  firstDart?: string;
  secondDart?: string;
  thirdDart?: string;

  factory?: string;

  currentRoundDartsScore: number = 0;

  currentPlayer: string = '1';

  rounds: Round[] = [];
  nbTotalDeTour?: number;
  currentTour: number = 1;

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
      }
    }
    this.nbTotalDeTour = parseInt(this.whoseDartsGame.nbTours);
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

  darts(dartValue: number) {
    if (this.firstDart == undefined) {
      this.firstDart = this.toDarts(dartValue);
    } else if (this.toDartsValue(this.firstDart) >= 0 && this.secondDart == undefined) {
      this.secondDart = this.toDarts(dartValue);
    } else if (this.toDartsValue(this.firstDart) >= 0 && (this.secondDart != undefined && this.toDartsValue(this.secondDart) >= 0) && this.thirdDart == undefined) {
      this.thirdDart = this.toDarts(dartValue);
    }
    this.isDouble = false;
    this.isTriple = false;
    this.calcCurrentRoundDartsScore();
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
    if (this.nbTotalDeTour && this.currentTour < this.nbTotalDeTour) {
      // this.currentTour++;
      this.rounds.push({
        firstDart: this.firstDart!,
        secondDart: this.secondDart!,
        thirdDart: this.thirdDart!
      });
      this.firstDart = undefined;
      this.secondDart = undefined;
      this.thirdDart = undefined;
    }

    if (this.allPlayersDidPlay()) {

    }
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
  }

  nextPlayer() {

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

}
