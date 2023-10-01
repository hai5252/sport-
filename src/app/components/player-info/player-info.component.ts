import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  playersTab:any = [
    {id:1, name:"Messi", number:10, position:"ATK"},
    {id:2, name:"CR7", number:7, position:"MID"},
    {id:3, name:"SALAH", number:9, position:"DEF"},
  ];
  findedPlayer: any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    for (let i = 0; i < this.playersTab.length; i++) {
      if (this.playersTab[i].id == id) {
        this.findedPlayer = this.playersTab[i];
        break;
      }
      
    }

  console.log("here finded player", this.findedPlayer);
  }

}
