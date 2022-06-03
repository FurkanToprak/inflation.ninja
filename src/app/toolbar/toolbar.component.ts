import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goHome(): void {
    window.location.href = "/"
  }

  goLearn(): void {
    window.location.href = "/learn"
  }

  goDonate(): void {
    window.location.href = "https://www.paypal.com/paypalme/FurkanToprak"
  }
}
