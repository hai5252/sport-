import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Form ID
  signupForm: FormGroup;

  title: String;
  path: String;
  imagePreview: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;
    this.path == "/subscription" ?
      this.title = "Signup User" :
      this.title = "Signup Admin";
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""],
    });
  }

  signup() {
    console.log("Here user", this.signupForm.value);
    this.signupForm.value.role = this.path == "/subscription" ? "user" : "admin";
    console.log("Here user", this.signupForm.value);
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (response) => {
        console.log("Here response from BE", response.msg);
      });
  }

  onImageSelected(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
