import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerURL:string = "http://localhost:3000/api/players";
  constructor(private httpClient: HttpClient) { }

  addPlayer(player, img: File){
    let formData = new FormData();
    // Comment remplir le formData
    formData.append("name", player.name);
    formData.append("position", player.position);
    formData.append("nbr", player.nbr);
    formData.append("tId", player.tId);
    formData.append("img", img);
    return this.httpClient.post<{msg: string}>(this.playerURL, formData);
  }

  editPlayer(newPlayer){
    return this.httpClient.put(this.playerURL, newPlayer);
  }

  getPlayerById(id){
    return this.httpClient.get(this.playerURL + "/" + id);
  
  }

  deletePlayerById(id){
      return this.httpClient.delete(this.playerURL + "/" + id);
  } 
  // Array of players objects
  getAllPlayers(){
    return this.httpClient.get(this.playerURL);
} 

}
