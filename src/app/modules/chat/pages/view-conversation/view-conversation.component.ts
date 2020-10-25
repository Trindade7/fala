import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ErrorLogger } from '@app/core/helpers/error-log';
import { AuthService } from '@app/core/services/auth/auth.service';

import { UploadFilesComponent } from '../../components/upload-files/upload-files.component';
import { ChatService } from '../../services/chat/chat.service';
import { ViewConversationService } from '../../services/view-conversation/view-conversation.service';

@Component({
  selector: 'app-view-conversation',
  templateUrl: './view-conversation.component.html',
  styleUrls: ['./view-conversation.component.scss']
})
export class ViewConversationComponent implements OnInit {
  errorLogger = new ErrorLogger();

  @Output() closeConversationEmitter = new EventEmitter<boolean>();

  messageForm = this._fb.group({
    messageBody: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000)
      ]
    ],
  });

  constructor (
    public _auth: AuthService,
    private _chatService: ChatService,
    public conversationSvc: ViewConversationService,
    private _fb: FormBuilder,
    private _bottomSheet: MatBottomSheet
  ) { }
  ngOnInit(): void { }

  openBottomSheet(): void {
    this._bottomSheet.open(UploadFilesComponent);
  }

  closeConversation(): void {
    this._chatService.appSettings.toggleSideNav(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: any): void {
    $event.preventDefault();
    this.openBottomSheet();
    console.log('HOVERED');
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave($event: any): void {
    $event.preventDefault();
    console.log('HOVER LEFT');
  }
}
