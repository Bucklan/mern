import { Routes } from '@angular/router';
import path from 'path';
import { IndexComponent } from './task/index/index.component';
import { CreateComponent } from './task/create/create.component';
import { EditComponent } from './task/edit/edit.component';
import { ViewComponent } from './task/view/view.component';

export const routes: Routes = [
    {path: 'task',redirectTo: 'task/index', pathMatch: 'full'},
    {path: 'task/index',component: IndexComponent},
    {path: '',redirectTo: 'task/index', pathMatch: 'full'},
    {path: 'task/create',component: CreateComponent},
    {path: 'task//:taskId/edit',component: EditComponent},
    {path: 'task//:taskId',component: ViewComponent},

];
