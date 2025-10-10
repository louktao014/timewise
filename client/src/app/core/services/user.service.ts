import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser = signal<User | null>(null);

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionData = JSON.parse(session);
      if (new Date().getTime() < sessionData.expiresAt) {
        this.currentUser.set(sessionData.user);
      } else {
        localStorage.removeItem('session');
      }
    }
  }

  public setSession(user: User) {
    const expiresAt = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    const sessionData = { user, expiresAt };
    localStorage.setItem('session', JSON.stringify(sessionData));
    this.currentUser.set(user);
  }

  public clearSession() {
    localStorage.removeItem('session');
    this.currentUser.set(null);
  }
}
