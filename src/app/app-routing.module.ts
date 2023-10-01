import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddStadiumComponent } from './components/add-stadium/add-stadium.component';


const routes: Routes = [
  //http://loclahost:4200 => HomeComponent will be display
{path: "", component:HomeComponent},
  //http://loclahost:4200/signin => LoginComponent will be display
{path: "signin", component:LoginComponent},


//http://loclahost:4200/subscription => SignupComponent will be display
{path: "subscription", component:SignupComponent},
{path: "signupAdmin", component:SignupComponent},

{path: "addMatch", component:AddMatchComponent},
{path: "addPlayer", component:AddPlayerComponent},
{path: "addTeam", component:AddTeamComponent},
{path: "addStadium", component:AddStadiumComponent},
{path: "admin", component:AdminComponent},
{path: "matches", component:MatchesComponent},
{path: "players", component:PlayersComponent},
// path=> path paramétré
{path: "matchInfo/:id", component:MatchInfoComponent},
{path: "teamInfo/:id", component:TeamInfoComponent},
{path: "playerInfo/:id", component:PlayerInfoComponent},
{path: "editMatch/:id", component:EditMatchComponent},
{path: "editTeam/:id", component:EditTeamComponent},
{path: "editPlayer/:id", component:EditPlayerComponent},
{path: "search", component:SearchMatchesComponent},
{path: "profile", component:ProfileComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
