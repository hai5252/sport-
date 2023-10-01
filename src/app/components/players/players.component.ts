import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersTab:any = [
    {id:1, name:"Messi", number:10, position:"ATK"},
    {id:2, name:"CR7", number:7, position:"MID"},
    {id:3, name:"SALAH", number:9, position:"DEF"},
  ];

  constructor() { }

  ngOnInit() {
  }

}
