import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { NavToolbarComponent } from './components/nav-toolbar/nav-toolbar.component';

@NgModule({
  declarations: [NavToolbarComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    RouterModule,
  ],
  exports: [NavToolbarComponent]
})
export class CoreModule { }
