import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewComponent implements OnInit {
  private typeGroups = {
    doc: ['doc', 'docx', 'txt', 'plain', 'document'],
    calc: ['xlsx', 'xls', 'csv', 'sheet'],
    book: ['pdf', 'epub', 'book'],
  };

  @Input() file!: File;

  filePreview: string | ArrayBuffer | null = null;
  fileType = '';
  fileTypeGroup: 'image' | 'video' | 'doc' | 'book' | 'calc' = 'image';


  constructor (
  ) { }

  ngOnInit(): void {
    this.createPreview();
  }

  createPreview(): void {
    const fileTypeGroup = this.file.type.split('/')[0];
    this.fileType = this.file.type.split('/')[1];
    console.log('FILE TYPE', this.file.type);

    if (this.fileType.includes('.')) {
      this.fileType = this.fileType.split('.').pop() ?? '';
    }


    if ((fileTypeGroup === 'image') || (fileTypeGroup === 'video')) {
      this.fileTypeGroup = fileTypeGroup;
      this.renderFile();
      return;
    } else if (this.typeGroups.doc.includes(this.fileType)) {
      this.fileTypeGroup = 'doc';
    } else if (this.typeGroups.calc.includes(this.fileType)) {
      this.fileTypeGroup = 'calc';
    } else if (this.typeGroups.book.includes(this.fileType)) {
      this.fileTypeGroup = 'book';
    }
    this.filePreview = '';
    return;
  }

  renderFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_) => {
      this.filePreview = reader.result;
      console.log('LOADED FILE');

    };
  }
}
