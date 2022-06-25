/* eslint-disable require-jsdoc */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LearnComponent} from './learn.component';

const routes: Routes = [
  {path: 'learn', component: LearnComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
    LearnComponent,
  ],
})
export class LearnRoutingModule { }
