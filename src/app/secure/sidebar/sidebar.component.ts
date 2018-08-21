import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  @Input() setupFlow:string;

  constructor() { }

  ngOnInit() {
  }

  logout() {
    // Log the current user out making a call to AWS
    
  }

}
