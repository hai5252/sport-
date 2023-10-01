import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  actualDate:Date;
  playersTab:any = [
    {id:1, name:"Messi", number:10, position:"ATK"},
    {id:2, name:"CR7", number:7, position:"MID"},
    {id:3, name:"SALAH", number:9, position:"DEF"},
  ];
  constructor(private router:Router) { }

  ngOnInit() {
    this.actualDate= new Date();
  }

  goToDisplay(id: number) {
    // alert("Clicked " + id);
    // location.replace(".....");
    this.router.navigate(["playerInfo/" + id]);
    // this.router.navigate([`teamInfo/${id}`]);
  }

  goToEdit(id: number) {
    this.router.navigate(["editPlayer/" + id]);
   
  }

}
