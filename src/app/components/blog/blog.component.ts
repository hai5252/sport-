import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
   blogTab:any = [
    {date:"14/08/2023", title:"Title1", description:"Description 1"},
    {date:"24/08/2023", title:"Title2", description:"Description 2"},
    {date:"09/12/2023", title:"Title3", description:"Description 3"},
    {date:"17/02/2023", title:"Title4", description:"Description 4"},
   ];
  constructor() { }

  ngOnInit() {
  }

}
