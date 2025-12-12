import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  username: string = '';
  role: string = '';
  private destroy$ = new Subject<void>();
constructor(private userService:UserService, private router:Router){}

ngOnInit(): void {
    this.actualizarInfoUsuario();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.actualizarInfoUsuario();
    });
  }

  private actualizarInfoUsuario(): void {
    if (this.userService.isLogged()) {
      this.username = localStorage.getItem('username') || '';
      const authorities = localStorage.getItem('authorities') || '';
      this.role = authorities.replace('ROLE_', '');
    } else {
      this.username = '';
      this.role = '';
    }
  }
Logout() {
  this.userService.logout();
  this.router.navigate(["/login"]);
}

HayUsuario() {
  return this.userService.isLogged()
}
ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
