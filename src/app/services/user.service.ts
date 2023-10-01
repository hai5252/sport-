import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL:string = "http://localhost:3000/api/users";
  constructor(private http: HttpClient) { }
  // user={firstName, lastName, email, pwd, role}
  signup(user, img: File){
    let formData = new FormData();
    // Comment remplir le formData
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("img", img);
    return this.http.post<{msg: boolean}>(this.userURL + "/signup", formData);
  }
  // user = {email, pwd}
  login(user){
    return this.http.post<{token:string, msg:string}>(this.userURL + "/login", user);
    }
  // newUser : object that contains new values
  editProfile(newUser){
    return this.http.put<{isUpdated: boolean}>(this.userURL, newUser);
  }

  displayUserById(id){
    return this.http.get<{user: any}>(this.userURL + "/" + id);
  }

}
