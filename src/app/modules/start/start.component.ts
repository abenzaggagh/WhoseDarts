import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CHECK_IN, CHECK_OUT, CRICKET_MODE, NB_TOURS} from "../../app.const";
import {Player, WhoseDarts} from "../../models/whose-darts.model";
import {GameService} from "../../services/GameService";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  whoseDarts: WhoseDarts | undefined;

  gameId: string | null | undefined;

  CHECK_OUT = CHECK_OUT;
  checkOut: string = 'SINGLE_OUT';

  CHECK_IN = CHECK_IN;
  checkIn: string = 'SINGLE_IN';

  CRICKET_MODE = CRICKET_MODE;
  cricketMode: string = 'NORMAL';

  NB_TOURS = NB_TOURS;
  nbTours: string = '15';

  nbPlayers = 2;
  players: Player[] = [{
    index: 1,
    firstName: '',
    lastName: '',
    username: 'Player 1',
    score: 0
  }, {
    index: 2,
    firstName: '',
    lastName: '',
    username: 'Player 2',
    score: 0
  }];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('GAME_ID');
  }

  addPlayer() {
    if (this.nbPlayers < 8) {
      this.nbPlayers++;
      this.players.push({
        index: this.nbPlayers,
        firstName: '',
        lastName: '',
        username: 'Player ' + this.nbPlayers,
        score: 0
      });
    }
  }

  start() {
    this.whoseDarts = {
      game: this.gameId!,
      players: this.players,
      nbTours: this.nbTours,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      modeDeJeu: this.cricketMode
    }
    this.gameService.setGame(this.whoseDarts);
    this.router.navigate(['/game']).then(r => r);
  }

}
