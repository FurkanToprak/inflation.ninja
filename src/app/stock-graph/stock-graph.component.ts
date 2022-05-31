import { Component } from '@angular/core';
import { AMZNData, Stock } from './data';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.scss']
})
export class StockGraphComponent {
  public data: Stock[] = AMZNData;
}
