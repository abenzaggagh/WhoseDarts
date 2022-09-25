import { Injectable } from '@angular/core';
import {WhoseDarts} from "../models/whose-darts.model";

@Injectable({ providedIn: 'root' })
export class GameService {

  private _game: WhoseDarts = {
    game: "", nbTours: "", players: []
  };

  constructor() { }

  setGame(game: WhoseDarts) {
    this._game = game;
  }

  getGame() : WhoseDarts {
    return this._game;
  }

}
