import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { GamesComponent } from './modules/games/games.component';
import { AppRoutingModule } from './app-routing.module';

import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ScoreComponent } from './components/score/score.component';
import { StartComponent } from './modules/start/start.component';
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import { GameComponent } from './modules/game/game.component';
import {InputTextModule} from "primeng/inputtext";
import { ChronoComponent } from './components/chrono/chrono.component';
import { CricketScoreboardComponent } from './components/cricket-scoreboard/cricket-scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    ScoreComponent,
    StartComponent,
    GameComponent,
    ChronoComponent,
    CricketScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    CardModule,
    SelectButtonModule,
    FormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
