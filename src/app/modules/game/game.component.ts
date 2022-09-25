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

  currentPlayer: string = '1';

  rounds: Round[] = [];
  nbTotalDeTour?: number;
  currentTour: number = 1;

  whoseDartsGame?: WhoseDarts;

  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.whoseDartsGame = this.gameService.getGame();
    if (this.whoseDartsGame == undefined) {
      this.router.navigate(['/games']).then(r => r);
    }
    this.nbTotalDeTour = parseInt(this.whoseDartsGame.nbTours);
  }

  back() {
    if (this.firstDart && this.secondDart && this.thirdDart &&
        Number(this.firstDart) >= 0 && Number(this.secondDart) >= 0 && Number(this.thirdDart) >= 0) {
      this.thirdDart = undefined;
    } else if (this.thirdDart == undefined && (this.secondDart && Number(this.secondDart) >= 0)) {
      this.secondDart = undefined;
    } else if (this.thirdDart == undefined && this.secondDart == undefined && (this.firstDart && Number(this.firstDart) >= 0)) {
      this.firstDart = undefined;
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
    } else if (Number(this.firstDart) >= 0 && this.secondDart == undefined) {
      this.secondDart = this.toDarts(dartValue);
    } else if (Number(this.firstDart) >= 0 && (this.secondDart != undefined && Number(this.secondDart) >= 0) && this.thirdDart == undefined) {
      this.thirdDart = this.toDarts(dartValue);
    }
    this.isDouble = false;
    this.isTriple = false;
  }

  next() {
    if (this.nbTotalDeTour && this.currentTour < this.nbTotalDeTour) {
      this.currentTour++;
      this.rounds.push({
        firstDart: this.firstDart!,
        secondDart: this.secondDart!,
        thirdDart: this.thirdDart!
      });
      this.firstDart = undefined;
      this.secondDart = undefined;
      this.thirdDart = undefined;
      console.log(this.rounds);
    }
  }

  isAllDartsSet() : boolean {
    return (this.firstDart != undefined && Number(this.firstDart) >= 0)
      && (this.secondDart != undefined && Number(this.firstDart) >= 0)
      && (this.thirdDart != undefined && Number(this.firstDart) >= 0);
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
