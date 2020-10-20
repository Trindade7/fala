import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoggedInGuard } from './core/services/auth/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'chat',
    canActivate: [UserLoggedInGuard],
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule)
  },

  {
    path: 'user',
    canActivate: [UserLoggedInGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },

  {
    path: 'dashboard',
    canActivate: [UserLoggedInGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },


  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
