import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {
  searchMatch : any=[];
  searchForm : FormGroup;
  matches:any = [];
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    this.searchForm = this.formBuilder.group(
      {
        scoreOne:["", [Validators.required]],
        scoreTwo:["", [Validators.required]],
      }
    );
  }

  search() {
    this.searchMatch = [];
    let obj = this.searchForm.value;
    
    // for (let i = 0; i < this.matches.length; i++) {
    //   if ((this.matches[i].scoreOne== obj.scoreOne) && (this.matches[i].scoreTwo==obj.scoreTwo)) {
    //     this.searchMatch.push(this.matches[i]);
    //   }
      
    // }
    this.searchMatch = this.matches.filter((elt)=>{
      
      return (
        elt.scoreOne == obj.scoreOne &&
        elt.scoreTwo == obj.scoreTwo
      );
    });
  }

}
