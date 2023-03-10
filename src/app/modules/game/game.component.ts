import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../../services/GameService";
import {Player, Round, WhoseDarts} from "../../models/whose-darts.model";
import {Cricket, CricketPlayer, Game, Players, X01, X01ModeEnum, X01Player} from "../../models/cricket.model";

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

  game: Game | undefined;

  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.whoseDartsGame = this.gameService.getGame();
    if (this.whoseDartsGame && this.whoseDartsGame.game && this.whoseDartsGame.game == "") {
      this.router.navigate(['/games']).then(r => r);
    } else {
      this.loadGame(this.whoseDartsGame);
      this.whoseDartsGame.players.forEach(player => {
        this.scores.set(player, []);
      });
    }
    this.nbTotalDeTour = parseInt(this.whoseDartsGame.nbTours);
    this.startChrono();
  }

  private loadGame(whoseDartsGame: WhoseDarts) {
    if (whoseDartsGame && whoseDartsGame.game) {
      if (whoseDartsGame.game === X01ModeEnum.DARTS_301_STRING
        || whoseDartsGame.game === X01ModeEnum.DARTS_501_STRING
        || whoseDartsGame.game === X01ModeEnum.DARTS_701_STRING
        || whoseDartsGame.game === X01ModeEnum.DARTS_1001_STRING) {
        const players = new Players<X01Player>;
        whoseDartsGame.players.forEach((player, index) => {
          player.score = Number(whoseDartsGame.game);
          return players.addPlayer(new X01Player(index, player.firstName, player.lastName, player.username));
        });
        this.game = new X01(players, Number(whoseDartsGame.game));
      } else if (whoseDartsGame.game === "CRICKET") {
        const players = new Players<CricketPlayer>;

      } else if (whoseDartsGame.game === "PARCHESS") {
        const players = new Players<X01Player>;
      }
    }
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

  toCricketMarks() : number {
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
            const currentMarksForDart = this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.get(String(dartValue))!
            this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.set(String(dartValue), currentMarksForDart + this.toCricketMarks());
        }
      } else if (this.toDartsValue(this.firstDart) >= 0 && this.secondDart == undefined) {
        this.secondDart = this.toDarts(dartValue);
        if (this.whoseDartsGame.players[this.currentPlayerIndexInRound] && this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks) {
          const currentMarksForDart = this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.get(String(dartValue))!
          this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.set(String(dartValue), currentMarksForDart + this.toCricketMarks());
        }
      } else if (this.toDartsValue(this.firstDart) >= 0 && (this.secondDart != undefined && this.toDartsValue(this.secondDart) >= 0) && this.thirdDart == undefined) {
        this.thirdDart = this.toDarts(dartValue);
        if (this.whoseDartsGame.players[this.currentPlayerIndexInRound] && this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks) {
          const currentMarksForDart = this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.get(String(dartValue))!
          this.whoseDartsGame.players[this.currentPlayerIndexInRound].cricketMarks?.set(String(dartValue), currentMarksForDart + this.toCricketMarks());
        }
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

    if (this.whoseDartsGame?.game == 'CRICKET') {
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
