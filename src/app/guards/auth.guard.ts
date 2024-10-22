import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService)
  const router = inject(Router)

  const isLogged = authSrv.getCurrentUser()

  if(isLogged)
  {
    return true;
  }
  else{
    alert("You must be signed in to continue");
    router.navigateByUrl("/auth")
    return false;
  }
};
