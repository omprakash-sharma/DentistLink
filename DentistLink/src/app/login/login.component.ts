import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserAuthService} from '../shared/services/user-auth.service';
import { CurrentUserService } from '../shared/services/current-user.service';

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


  constructor(private fb: FormBuilder, private router: Router, private uAuthService: UserAuthService, private cs: CurrentUserService) { 
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
    if(this.userInfo.userName && this.userInfo.userPassword){
      this.reqTokenObj.email = this.userInfo.userName;
      this.reqTokenObj.password = this.userInfo.userPassword;
      this.uAuthService.getAuthToken(this.reqTokenObj).subscribe(res => {
        console.log(res);
        
        this.cs.setAuth(res[0]);
        let _user =this.cs.getCurrentUser();
        this.router.navigate(['/home']);

      }, err => {
        console.log(err) 
      });
      
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