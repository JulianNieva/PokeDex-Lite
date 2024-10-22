import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/User';
import { Router } from '@angular/router';
import { ReturnResponse } from '../../../interfaces/ReturnResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  ngOnInit(): void {
    if(!this.authSrv.checkUsers()){
      this.authSrv.initUsers()
    }
  }

  constructor(private authSrv:AuthService,private router:Router)
  {
    this.loginForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  login(){
    if(this.loginForm.valid){
      const username = this.loginForm.controls['username'].value
      const password = this.loginForm.controls['password'].value

      const response:ReturnResponse = this.authSrv.userLogin({username,password} as User)

      if(response.code == 200)
      {
        this.router.navigateByUrl("/home")
      }
      else{
        alert(response.message)
      }
    }
    else{
      alert("Invalid form")
    }
  }

}
