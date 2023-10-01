import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  stadiumURL:string = "http://localhost:3000/api/stadiums";
  constructor(private httpClient: HttpClient) { }

  addStadium(stadium){
    return this.httpClient.post<{msg: string}>(this.stadiumURL, stadium);
  }

  getAllStadiums(){
    return this.httpClient.get<{stadiums:any}>(this.stadiumURL);
}
}
