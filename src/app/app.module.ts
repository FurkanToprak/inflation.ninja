import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './graph/graph.component';
import { StockGraphComponent } from "./stock-graph/stock-graph.component";
import { IgxFinancialChartModule } from "igniteui-angular-charts";
import { FooterComponent } from './footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		ToolbarComponent,
		GraphComponent,
		StockGraphComponent,
  FooterComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		IgxFinancialChartModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
