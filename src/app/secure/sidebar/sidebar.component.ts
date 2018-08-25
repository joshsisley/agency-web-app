import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  @Input() setupFlow:string;
  @Output() setTab:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    // Log the current user out making a call to AWS
    
  }

}
