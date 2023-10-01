import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  player : any={};
  playerForm:FormGroup;
  playersTab:any = [
    {id:1, name:"Messi", nbr:10, position:"ATK"},
    {id:2, name:"CR7", nbr:7, position:"MID"},
    {id:3, name:"SALAH", nbr:9, position:"DEF"},
  ];
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    for (let i = 0; i < this.playersTab.length; i++) {
      if (this.playersTab[i].id == id) {
        this.player = this.playersTab[i];
        break;
      }
      
    }

  console.log("here edited player", this.player);
  }

}
