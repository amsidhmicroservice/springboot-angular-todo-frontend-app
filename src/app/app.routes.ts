import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { TodolistComponent } from './todolist/todolist.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'welcome/:name',
        component: WelcomeComponent,
        canActivate: [RouteGuardService]
    }
    ,
    {
        path: 'todos',
        component: TodolistComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'todo/:todoId',
        component: TodoComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'addTodo',
        component: AddTodoComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [RouteGuardService]
    }
    ,
    {
        path: '**',
        component: ErrorComponent
    }


];
