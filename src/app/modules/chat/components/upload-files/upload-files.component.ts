import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { ProcessFileService } from './process-file.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  constructor (
    private _bottomSheetRef: MatBottomSheetRef<UploadFilesComponent>,
    public filesService: ProcessFileService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.filesService.clearFiles();
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }

}
