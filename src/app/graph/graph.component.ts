import { Component, OnInit } from '@angular/core';
import { 
	IgxFinancialChartModule,
	IgxLegendModule
 } from "igniteui-angular-charts";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
