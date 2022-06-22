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

  goStocks(): void {
    window.location.href = "/stocks"
  }

  goDonate(): void {
    window.location.href = "https://www.paypal.com/paypalme/FurkanToprak"
  }

  goDeveloper(): void {
    window.location.href = "https://www.furkantoprak.com"
  }
}
