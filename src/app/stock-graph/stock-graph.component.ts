import { Component } from '@angular/core';
import { AMZNData, dataCPI, Stock } from './data';

console.log(dataCPI)
@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent {
  public data: Stock[] = AMZNData;
}
