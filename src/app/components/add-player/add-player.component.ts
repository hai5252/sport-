import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  // Object
  player : any = {};
  teams: any = [];
  teamId:any;

  // Form ID
  playerForm : FormGroup;
  imagePreview: any;
  constructor(private formBuilder: FormBuilder, private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      position: ["", [Validators.required]],
      nbr: ["", [Validators.required]],
      img: [""],
    });
    
    this.teamService.getAllTeams().subscribe((response)=>{
      this.teams = response.teams;
      this.teamId = this.teams[0]._id;
    });
    
  }

  addPlayer() {
    this.playerForm.value.tId = this.teamId;
    console.log("Here player", this.playerForm.value);
    this.playerService.addPlayer(this.playerForm.value, this.playerForm.value.img).subscribe(
      (response) => {
        console.log("Here response from BE", response.msg);
      });
  }

  selectTeam(event){
    console.log("Here Team Id", event.target.value);
    this.teamId = event.target.value;
  }

  onImageSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.playerForm.patchValue({ img: file });
    this.playerForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
