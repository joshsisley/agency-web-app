import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {

  @Input() message:string;

  constructor() { }

  ngOnInit() {
  }

}
