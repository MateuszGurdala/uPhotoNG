import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountHttpClientService } from './account-http-client.service';

export const authGuard: CanActivateFn = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let httpClient = inject<AccountHttpClientService>(AccountHttpClientService);
  let router = inject<Router>(Router);

  let isAuthenticated = await firstValueFrom(
    httpClient.ValidateAuthentication()
  );

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/SignIn']);
    return false;
  }
};
