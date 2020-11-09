import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { extractFileType, FileGroup, getFileTypeGroup, MessageFile } from '@app/core/models/conversation.model';
import { LocalFileData } from '@app/core/models/upload-task.model';


@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilePreviewComponent implements OnInit {
  @Input() fileData!: LocalFileData;
  @Input() fileUrl!: MessageFile;
  @Input() isThumbnail = true;

  filePreview: string | ArrayBuffer | null = null;
  fileTypeGroup: FileGroup = 'other';
  showSection = {
    image: false,
    video: false,
    other: false
  };

  constructor() { }

  ngOnInit(): void {
    if (this.fileUrl) {
      this.fileTypeGroup = getFileTypeGroup(this.fileUrl.type);
    } else if (this.fileData) {
      this.fileTypeGroup = this.createPreviewFromData(this.fileData);
    }

    this.canShow(this.fileTypeGroup);
  }

  extractType(fileType: string): string {
    return extractFileType(fileType);
  }

  createPreviewFromData(fileData: LocalFileData): FileGroup {
    const typeGroup = getFileTypeGroup(fileData.type);
    if ((typeGroup === 'image') || (typeGroup === 'video')) {
      this.renderFile(fileData.file);
    }

    return typeGroup;
  }

  canShow(mode: FileGroup, showSection = this.showSection): void {
    switch (mode) {
      case 'image':
        showSection.image = true;
        break;
      case 'video':
        showSection.video = true;
        break;

      default:
        showSection.other = true;
        break;
    }

    return;
  }

  renderFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.filePreview = reader.result;
      console.log('LOADED FILE', file.type);
    };

    return;
  }
}
