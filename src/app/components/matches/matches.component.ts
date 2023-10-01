import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matchesTab:any = [];
  constructor() { }

  ngOnInit() {
    this.matchesTab =JSON.parse(localStorage.getItem("matches") || "[]");
  }
// mise à jour matchesTab
  updateMatches(T:any){
    this.matchesTab = T;
  }

}
