import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./modules/home/home.component";
import {GamesComponent} from "./modules/games/games.component";
import {StartComponent} from "./modules/start/start.component";
import {Games} from "./models/whose-darts.model";
import {GameComponent} from "./modules/game/game.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games',
    component: GamesComponent,
    children: [{
      path: '301',
      data: {
        game: Games.DARTS_301
      },
      component: StartComponent
    }]
  },
  { path: 'start/:GAME_ID',
    component: StartComponent,
  },
  { path: 'game',
    component: GameComponent,
  },
  { path: 'about', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
