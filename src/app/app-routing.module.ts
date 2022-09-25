import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./modules/home/home.component";
import {GamesComponent} from "./modules/games/games.component";

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'games', component: GamesComponent },
  { path: 'about', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }