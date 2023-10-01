import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  // matchesTab:any = [
  //   {id:1, scoreOne:0, scoreTwo:1, teamOne:"EST", teamTwo:"CA"},
  //   {id:2, scoreOne:2, scoreTwo:1, teamOne:"FCBs", teamTwo:"RMD"},
  //   {id:3, scoreOne:1, scoreTwo:1, teamOne:"SEV", teamTwo:"JUV"},
  // ];
  findedMatch: any;
  constructor(private activatedRoute:ActivatedRoute, private matchService:MatchService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    this.matchService.displayMatchById(id).subscribe(
      (response)=>{
        console.log("Here response from BE", response);
        this.findedMatch = response.match;
      });
 



  //   for (let i = 0; i < this.matchesTab.length; i++) {
  //     if (this.matchesTab[i].id == id) {
  //       this.findedMatch = this.matchesTab[i];
  //       break;
  //     }
      
  //   }

  // console.log("here finded match", this.findedMatch);
  }

}
