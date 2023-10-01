import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matchesTab:any = [];
  constructor(private router:Router, private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.displayAllMatches().subscribe(
      (response)=>{
        console.log("Here response from BE", response);
      this.matchesTab = response.matches;
      });
    // this.tab = JSON.parse(localStorage.getItem("matches") || "[]");
  }

  goToDisplay(id: number) {
    // alert("Clicked " + id);
    // location.replace(".....");
    this.router.navigate(["matchInfo/" + id]);
    // this.router.navigate([`matchInfo/${id}`]);
  }
   
  goToEdit(id: number) {
    this.router.navigate(["editMatch/" + id]);
    
  }

  deleteMatch(x) {
    for (let i = 0; i < this.matchesTab.length; i++) {
      if (this.matchesTab[i].id == x) {
        this.matchesTab.splice(i, 1);
        break;
      }
      
    }
    localStorage.setItem("matches", JSON.stringify(this.matchesTab));
  }
}
