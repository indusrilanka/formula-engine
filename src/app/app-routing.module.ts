import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartComposeComponent } from './smart-compose/smart-compose.component';

const routes: Routes = [
  { path: 'smart-compose', component: SmartComposeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
