import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  @Input() isLogin:boolean;
  toggleSubmenu() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.row-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.row-offcanvas').classList.remove('active');
    }
  }
  constructor() { }
  ngOnInit() {
  }

}
