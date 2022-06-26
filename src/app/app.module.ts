import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphComponent} from './graph/graph.component';
import {StockGraphComponent} from './stock-graph/stock-graph.component';
import {IgxFinancialChartModule} from 'igniteui-angular-charts';
import {HomeComponent} from './home/home.component';
import {NgxLoadingModule} from 'ngx-loading';
import {LearnComponent} from './learn/learn.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {ChartComponent} from './chart/chart.component';

const routes: Routes = [
  {
    path: 'learn',
    component: LearnComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GraphComponent,
    StockGraphComponent,
    HomeComponent,
    LearnComponent,
    ChartComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    IgxFinancialChartModule,
    NgxLoadingModule.forRoot({}),
    MatTabsModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
