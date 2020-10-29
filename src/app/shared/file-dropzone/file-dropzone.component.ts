import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileDropzoneComponent implements OnInit {
  isHovering = false;
  @Output() filesEmitter: EventEmitter<FileList> = new EventEmitter();

  constructor (
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    this.filesEmitter.emit(files);
  }
}