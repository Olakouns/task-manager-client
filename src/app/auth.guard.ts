import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {GlobalService} from "./services/global.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const globalService = inject(GlobalService);
  const router = inject(Router);

  if (globalService.isAuth()) {
    return true;
  } else {
    localStorage.setItem('last_action_url', state.url);
    router.navigateByUrl('/auth/login').then();
    return false;
  }
}
