import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamURL:string = "http://localhost:3000/api/teams";
  constructor(private httpClient: HttpClient) { }

  addTeam(team){
    return this.httpClient.post<{msg: string}>(this.teamURL, team);
  }

  getAllTeams(){
    return this.httpClient.get<{teams:any}>(this.teamURL);
}
}
