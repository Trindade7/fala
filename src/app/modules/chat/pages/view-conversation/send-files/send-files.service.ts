import { Injectable } from '@angular/core';
import { Logger as logger } from '@app-core/helpers/logger';
import { extractFileType } from '@app/core/models/conversation.model';
import { LocalFileData } from '@app/core/models/upload-task.model';

import { ViewConversationService } from '../view-conversation.service';

@Injectable({
  providedIn: 'root'
})
export class SendFilesService {
  filesData: LocalFileData[] = [];

  private _selectedIndex = 0;

  constructor(
    private _conversationSvc: ViewConversationService
  ) { }

  private isValid(file: File): boolean {
    // *max 50MB
    if (file.size < 52428800) {
      return true;
    }

    return false;
  }

  get selectedFile(): File {
    return this.filesData[this._selectedIndex].file;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    this._selectedIndex = index;
  }

  addFile(file: File): void {
    if (this.isValid(file)) {
      this.filesData.push({ file, type: file.type });
    }
  }

  removeFile(index: number): void {
    this.filesData.splice(index, 1);
  }

  addFiles(fileList: FileList): void {
    // ? File list has iterration issues :D
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      logger.collapsed('[send-file.service] [addfiles()]', ['File', file]);

      if (this.isValid(file)) {
        this.filesData.push({ file, type: extractFileType(file.type) });
      } else {
        console.log('Files do not meet the requirements');
      }
    }
  }

  clearFiles(): void {
    this.filesData = [];
  }

  sendFiles(): void {
    this.filesData.forEach(
      fileData => this._conversationSvc.sendFile(fileData, 'file sent').then(
        () => logger.collapsed('[send-files.service] File sent', [fileData])
      ).catch(err => logger.collapsedT(
        '[send-files.service] Error sending file',
        [{ type: 'error', log: err }])
      )
    );
  }

}
