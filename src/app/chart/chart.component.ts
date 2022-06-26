import {Component, OnInit} from '@angular/core';

export interface Stock {
  position: number;
  name: string;
  symbol: string;
  return: number;
  volume: number;
}


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass'],
})
export class ChartComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: Stock[] = [];
  constructor() {
    this.displayedColumns = [
      'position',
      'name',
      'symbol',
      'price',
      'return',
    ];
    this.dataSource = [];
  }

  ngOnInit(): void {
  }
}
