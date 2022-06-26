import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
/**
 * Chart component
 */
export class ChartComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor() {
    this.displayedColumns = [
      'position',
      'name',
      'symbol',
      'price',
      'return',
    ];
    this.dataSource = new MatTableDataSource<Stock>([
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
      {
        position: 0,
        name: 'string',
        symbol: 'string',
        return: 0,
        volume: 0,
      },
    ]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
  }
}
