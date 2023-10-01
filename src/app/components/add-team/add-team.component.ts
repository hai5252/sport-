import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StadiumService } from 'src/app/services/stadium.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  // Object
team : any ={};

stadiums: any = [];

// FORM ID
teamForm: FormGroup;
stadiumId:any;

  constructor(private teamService: TeamService, private stadiumService: StadiumService) { }

  ngOnInit() {
    this.stadiumService.getAllStadiums().subscribe((response)=>{
      this.stadiums = response.stadiums;
      this.stadiumId = this.stadiums[0]._id;
    });
  }

  addTeam() {
    console.log("Here team object", this.team);
    this.teamService.addTeam(this.team).subscribe(
      (response) => {
        console.log("Here response from BE", response.msg);
      });
  }

  selectStadium(event){
    console.log("Here Stadium Id", event.target.value);
    this.stadiumId = event.target.value;
  }

}
