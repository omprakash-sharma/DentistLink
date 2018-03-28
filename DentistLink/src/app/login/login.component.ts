import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserAuthService} from '../shared/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // initialize variables
  loginForm: FormGroup;
  userInfo :loginType;
  reqTokenObj = <authType>{};

  constructor(private fb: FormBuilder, private router: Router, private uAuthService: UserAuthService) { 
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      userPassword: ['', Validators.required]
    })
  };
  login(){
    this.userInfo = this.loginForm.value;
    console.log(this.userInfo)
    if(this.userInfo.userName && this.userInfo.userPassword){
      this.reqTokenObj.email = this.userInfo.userName;
      this.reqTokenObj.password = this.userInfo.userPassword;
      this.uAuthService.getAuthToken(this.reqTokenObj).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err) 
      });
      this.router.navigate(['/home']);
    }else{
      return false;
    }
  };

  ngOnInit() {
  }

}

interface loginType{
  userName: String,
  userPassword: any
}
interface authType{
  email: String,
  password: String
}