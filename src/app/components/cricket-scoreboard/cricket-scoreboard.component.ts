import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../models/whose-darts.model";

@Component({
  selector: 'app-cricket-scoreboard',
  templateUrl: './cricket-scoreboard.component.html',
  styleUrls: ['./cricket-scoreboard.component.css']
})
export class CricketScoreboardComponent implements OnInit {

  CRICKET_MARKS = ['20', '19', '18', '17', '16', '15', '25'];

  @Input()
  players: Player[] = [];

  leftPlayers(): Player[] {
    return this.players.filter(player => player.index % 2 === 0);
  }

  rightPlayers(): Player[] {
    return this.players.filter(player => player.index % 2 === 1);
  }

  constructor() {

  }

  ngOnInit(): void {
    this.initScores();
  }

  initScores() {
    this.players.forEach(player => {
      player.cricketMarks = new Map<string, number>();
      this.CRICKET_MARKS.forEach(mark => {
        player.cricketMarks?.set(mark, 0);
      });
    });
  }

}
