import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: any;
  findedUser: any;
  userForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName:["", [Validators.required]],
      lastName:["", [Validators.required]],
      email: ["", [Validators.required]],
    })
  this.id = localStorage.getItem("connectedUser");
  console.log("id:", this.id);

    this.userService.displayUserById(this.id).subscribe(
      (doc)=>{
        console.log("Here response from BE", doc.user);
        this.findedUser = doc.user;
        
      });
  }

  editProfile() { 
   let obj = this.userForm.value;
   obj._id=localStorage.getItem("connectedUser");
    console.log("Here user", this.userForm.value);
    this.userService.editProfile(obj).subscribe(
      (response) => {
        console.log("Here response from BE", response);
      });
      this.router.navigate([""]);
  }

}
