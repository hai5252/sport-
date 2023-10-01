import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  matchesTab : any = [];
  @Input() matchInput:any;
  @Output() matchesOutput:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.matchesTab= JSON.parse(localStorage.getItem("matches") || "[]");
  }
 scoreColor(a,b){
 if (a>b) {
  return "red";
 } else if (a<b) {
  return "green";
 } else{
  return "blue";
 }
 }

 deleteMatch(id){
  for (let i = 0; i < this.matchesTab.length; i++) {
    if (this.matchesTab[i].id == id) {
      this.matchesTab.splice(i,1);
      this.matchesOutput.emit(this.matchesTab);
      break;
    }
  }
  localStorage.setItem("matches", JSON.stringify(this.matchesTab));
 }
}
