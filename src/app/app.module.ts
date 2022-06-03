import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, Router  } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './graph/graph.component';
import { StockGraphComponent } from "./stock-graph/stock-graph.component";
import { IgxFinancialChartModule } from "igniteui-angular-charts";
import { FooterComponent } from './footer/footer.component';
import { LearnComponent } from './learn/learn.component';

const routes: Routes = [
	{
		path: '',
		component: GraphComponent
	},
	{
		path: 'learn',
		component: LearnComponent
	}
]
@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		GraphComponent,
		StockGraphComponent,
  FooterComponent,
  LearnComponent
	],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		BrowserAnimationsModule,
		IgxFinancialChartModule
	],
	exports: [RouterModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
