import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      // Jeśli jesteś w środowisku serwera, blokuj dostęp
      return false;
    }

    const isLoggedIn = !!localStorage.getItem('token'); // Sprawdzanie tokenu
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Przekierowanie niezalogowanych
      return false;
    }

    return true; // Użytkownik jest zalogowany
  }
}
