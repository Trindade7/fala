import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageFilesService {
  files: File[] = [];
  private _selectedIndex = 0;

  constructor () { }

  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(index: number) {
    this._selectedIndex = index;
  }

  get selectedFile(): File {
    return this.files[this._selectedIndex];
  }

  addFile(file: File): void {
    if (this.isValid(file)) {
      this.files.push(file);
    }
  }
  removeFile(index: number): void {
    this.files.splice(index, 1);
  }

  addFiles(fileList: FileList): void {
    // ? File list has iterration issues :D
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (this.isValid(file)) {
        this.files.push(file);
      } else {
        console.log('Error adding files');
      }
    }
  }

  clearFiles(): void {
    this.files = [];
  }

  isValid(file: File): boolean {
    // const fileType = file.type.split('/')[1];
    // if (AcceptedFileTypesList.includes(fileType)) {
    //   return true;
    // }

    // *max 50MB
    if (file.size < 52428800) {
      return true;
    }

    return false;
  }
}
