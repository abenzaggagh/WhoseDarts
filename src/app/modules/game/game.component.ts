import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/GameService";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    console.log(this.gameService.getGame());
  }

}
