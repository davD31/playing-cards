import { Routes } from '@angular/router';
import { MonsterList } from './pages/monster-list/monster-list';
import { Monster } from './pages/monster/monster';
import { NotFound } from './pages/not-found/not-found'; 
import { Login } from './pages/login/login';

export const routes: Routes = [
  { 
    path: 'home',
    component: MonsterList
  },
  { 
    path: 'login',
    component: Login
  },
  { 
    path: 'monster', 
    children: [{
        path:'',
        component: Monster,
    },{
        path: ':id',
        component: Monster
    }]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFound 
  }
];