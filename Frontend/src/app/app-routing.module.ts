import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodocomponentComponent } from './pages/todocomponent/todocomponent.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/todos',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
      },
    {
        path: 'todos',
        canActivate:[authGuard],
        component: TodocomponentComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }