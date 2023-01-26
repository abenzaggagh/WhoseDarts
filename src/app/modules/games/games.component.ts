import { Component, OnInit } from '@angular/core';
import {GAMES} from "../../app.const";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games = GAMES;

  constructor() { }

  ngOnInit(): void {}

}
