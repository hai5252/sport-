import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  tab:any = [];
  match: any ={};
  matchForm: FormGroup;
  id:any;
  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.tab = JSON.parse(localStorage.getItem("matches") || "[]");
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    for (let i = 0; i < this.tab.length; i++) {
      if (this.tab[i].id == this.id) {
        this.match = this.tab[i];
        break;
      }
      
    }

  }

  editMatch() { 
    
    for (let i = 0; i < this.tab.length; i++) {
      if (this.tab[i].id == this.id) {
        this.tab[i] = this.match;
        break;
      }
    }
    localStorage.setItem("matches", JSON.stringify(this.tab));
    this.router.navigate(["admin"]);
  }

}
