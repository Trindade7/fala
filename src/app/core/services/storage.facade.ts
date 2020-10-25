import { FileData, FileUploader } from '../models/upload-task.model';
import { FirestorageService } from './firebase/firestorage.service';

export class StorageFacade<T> extends FirestorageService<T>{
    basePath = 'albums';
    private _uploading: FileUploader[] = [];

    saveFile(fileData: FileData): Promise<any> {
        const fileTask = this.addFile(fileData.file, fileData.path);
        const index = this._uploading.length;
        this._uploading.push({
            data: fileData,
            cancel: fileTask.cancel,
            pause: fileTask.pause,
            resume: fileTask.resume,
            percentageChanges: fileTask.percentageChanges() ?? null,
        });

        return fileTask.then(res => {
            this._uploading.splice(index, 1);
            return res.ref.getDownloadURL();
        });
    }

    get uploadingList(): FileUploader[] {
        return this._uploading;
    }
}