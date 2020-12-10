import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {RegisterTradeMarkComponent} from './registerTradeMark/registerTradeMark.component';

const routes: Routes = [
  { path: 'personal-data', component: PersonalDataComponent},
  {path: '',  component: RegisterTradeMarkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
