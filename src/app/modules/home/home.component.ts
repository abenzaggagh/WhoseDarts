import { Component, OnInit } from '@angular/core';
import {HOME} from "../../app.const";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home = HOME;

  constructor() { }

  ngOnInit(): void {
  }

}
