import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AvatarComponent } from './components/avatar/avatar.component';
import { PageIsLoadingComponent } from './components/page-is-loading/page-is-loading.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileDropzoneComponent } from './file-dropzone/file-dropzone.component';

@NgModule({
  declarations: [DropZoneDirective, FileDropzoneComponent, AvatarComponent, PageIsLoadingComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatBottomSheetModule,
    DropZoneDirective,
    MatRippleModule,
    MatGridListModule,

    FileDropzoneComponent,
    AvatarComponent,
    PageIsLoadingComponent

  ]
})
export class SharedModule { }
