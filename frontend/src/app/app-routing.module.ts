import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./task/index/index.component";
import {CreateComponent} from "./task/create/create.component";
import {EditComponent} from "./task/edit/edit.component";
import {ViewComponent} from "./task/view/view.component";

const routes: Routes = [
  {path: '', redirectTo: '/task', pathMatch: 'full'},
  {path: 'task', component: IndexComponent},
  {path: 'task/create', component: CreateComponent},
  {path: 'task//:taskId/edit', component: EditComponent},
  {path: 'task//:taskId', component: ViewComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
