import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './graph/graph.component';
import { StockGraphComponent } from "./stock-graph/stock-graph.component";
import { IgxFinancialChartModule } from "igniteui-angular-charts";
import { LearnComponent } from './learn/learn.component';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
	{
		path: 'stocks',
		component: GraphComponent
	},
	{
		path: '',
		component: LearnComponent
	}
]
@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		GraphComponent,
		StockGraphComponent,
		LearnComponent
	],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		BrowserAnimationsModule,
		IgxFinancialChartModule,
		NgxLoadingModule.forRoot({}),
	],
	exports: [RouterModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
