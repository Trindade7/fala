import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoggedInGuard, UserNotLoggedInGuard } from './core/services/auth/auth.guard';
import { SettingsComponent } from './modules/chat/pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ChatComponent } from './pages/themes/chat/chat.component';

const mobilePaths: Routes = [
  {
    path: 'mobile',
    canActivate: [UserLoggedInGuard],
    component: HomeComponent,
    children: [
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
        path: 'settings',
        canActivate: [UserLoggedInGuard],
        component: SettingsComponent
      },

      {
        path: 'dashboard',
        canActivate: [UserLoggedInGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
];

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UserNotLoggedInGuard],
    component: LoginPageComponent,
  },
  {
    path: 'chat-t',
    component: ChatComponent
  },

  {
    path: 'main',
    canActivate: [UserLoggedInGuard],
    children: [
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
        path: 'settings',
        canActivate: [UserLoggedInGuard],
        component: SettingsComponent
      },

      {
        path: 'dashboard',
        canActivate: [UserLoggedInGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      ...mobilePaths
    ]
  },

  { path: '', redirectTo: '/main', pathMatch: 'full' },
  // { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
