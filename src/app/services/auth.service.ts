import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { ReturnResponse } from '../interfaces/ReturnResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:User

  constructor() { 
    const storedUser = localStorage.getItem("CurrentUser");

    if(storedUser){
      this.user = JSON.parse(storedUser);
    }
  }

  userLogin(userData:User)
  {
    let response:ReturnResponse = {
      message:"Something went wrong",
      code:500
    }
    
    const users = localStorage.getItem("Users");

    if(users)
    {
      response.code = 401;
      response.message="Invalid credentials"

      const usersJSON = JSON.parse(users)

      const userFound:User = usersJSON.find(({username , password}:User) => {
        return password === userData.password && username === userData.username
      })

      if(userFound)
      {
        const currentUser:User = {
          id:userFound.id,
          username:userFound.username
        }

        this.user = currentUser;
        localStorage.setItem("CurrentUser",JSON.stringify(this.user))
        response.code = 200;
        response.message = "The user was found"
      }
    }

    return response;
  }

  initUsers(): void
  {
    const users = [{
        id:1,
        username:"trainer",
        password:"password"
      },
      {
        id:2,
        username:"master",
        password:"password"
      }]

    localStorage.setItem("Users",JSON.stringify(users))
  }

  checkUsers() : boolean
  {
    return localStorage.getItem("Users") ? true : false;
  }

  getCurrentUser() : User{
    return this.user;
  }

  logout(){
    localStorage.removeItem("CurrentUser")
  }
}
