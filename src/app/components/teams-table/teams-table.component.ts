import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  tabTeam:any = [];
  constructor(private router:Router) { }

  ngOnInit() {
    this.tabTeam = JSON.parse(localStorage.getItem("teams") || "[]");
  }

  goToDisplay(id: number) {
    // alert("Clicked " + id);
    // location.replace(".....");
    this.router.navigate(["teamInfo/" + id]);
    // this.router.navigate([`teamInfo/${id}`]);
  }

  goToEdit(id: number) {
    this.router.navigate(["editTeam/" + id]);
  }

}
