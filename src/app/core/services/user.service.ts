import { Injectable, signal } from '@angular/core';

export interface User {
  name: string;
  email: string;
  permission?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser = signal<User | null>(null);
  public userList = [
    {
      username: 'dev',
      password: '1',
      userDetail: { name: 'Admin User', email: 'admin@example.com', permission: 'ADMIN' },
    },
    {
      username: 'dev',
      password: '2',
      userDetail: { name: 'Admin User', email: 'admin@example.com', permission: 'EMPLOYEE' },
    },
  ];

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
    const expTime = 3 * 24 * 60 * 60 * 1000;
    const expiresAt = new Date().getTime() + expTime;
    const sessionData = { user, expiresAt };
    localStorage.setItem('session', JSON.stringify(sessionData));
    this.currentUser.set(user);
  }

  public clearSession() {
    localStorage.removeItem('session');
    this.currentUser.set(null);
  }

  public getUser(username: string, password: string) {
    return this.userList.find((user) => user.username === username && user.password === password);
  }
}
