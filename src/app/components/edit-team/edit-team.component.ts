import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  team : any={};
  teamForm : FormGroup;
  tabTeam:any = [
    {id:1, teamName:"EST", teamOwner:"E", foundation:1919, stadium:"tunis"},
    {id:2, teamName:"CA", teamOwner:"C", foundation:1920, stadium:"tunis"},
    {id:3, teamName:"CSS", teamOwner:"S", foundation:1928, stadium:"sousse"},
  ];
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    for (let i = 0; i < this.tabTeam.length; i++) {
      if (this.tabTeam[i].id == id) {
        this.team = this.tabTeam[i];
        break;
      }
      
    }

  console.log("here edited player", this.team);
  }

}
