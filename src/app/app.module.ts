import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './graph/graph.component';
import { StockGraphComponent } from "./stock-graph/stock-graph.component";
import { IgxFinancialChartModule } from "igniteui-angular-charts";
import { HomeComponent } from './home/home.component';
import { NgxLoadingModule } from 'ngx-loading';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'compare',
		component: GraphComponent
	}
]
@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		GraphComponent,
		StockGraphComponent,
		HomeComponent
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
