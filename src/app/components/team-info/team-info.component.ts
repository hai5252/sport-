import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  tabTeam:any = [
    {id:1, teamName:"EST", teamOwner:"E", foundation:1919, stadium:"tunis"},
    {id:2, teamName:"CA", teamOwner:"C", foundation:1920, stadium:"tunis"},
    {id:3, teamName:"CSS", teamOwner:"S", foundation:1928, stadium:"sousse"},
  ];
  findedTeam: any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    for (let i = 0; i < this.tabTeam.length; i++) {
      if (this.tabTeam[i].id == id) {
        this.findedTeam = this.tabTeam[i];
        break;
      }
      
    }

  console.log("here finded team", this.findedTeam);
  }



}
