import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    const hasSession = await this.authService.hasValidSession();

    if (hasSession) {
      return true;
    }

    await this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });

    return false;
  }
}