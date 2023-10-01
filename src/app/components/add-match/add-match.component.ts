import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { gnerateId } from 'src/app/data/genericFunctions';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  // Object
match: any = {};
// Form ID
matchForm: FormGroup;
  constructor(private matchService:MatchService) { }

  ngOnInit() {}
  // Method
  addMatch() { 
    console.log("Here match object", this.match);
    this.matchService.addMatch(this.match).subscribe(
      (response)=>{
        console.log("Here response from BE", response);
      });
    // let matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    // this.match.id= gnerateId(matchesTab);
    // matchesTab.push(this.match);
    // localStorage.setItem("matches", JSON.stringify(matchesTab));
  }

}


