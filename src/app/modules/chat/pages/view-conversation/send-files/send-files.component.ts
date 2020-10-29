import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { MessageFilesService } from './message-files.service';

@Component({
  selector: 'app-send-files',
  templateUrl: './send-files.component.html',
  styleUrls: ['./send-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendFilesComponent implements OnDestroy {
  constructor (
    private _bottomSheetRef: MatBottomSheetRef<SendFilesComponent>,
    public filesService: MessageFilesService
  ) { }

  ngOnDestroy(): void {
    this.filesService.clearFiles();
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }
}
