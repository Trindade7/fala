import { environment } from '@app-envs/environment';

export class ErrorLogger {
    collapsed(title: string, logs: any[]): void {
        if (environment.production === false) {
            console.groupCollapsed(title);
            console.log(...logs);
            console.groupEnd();
        }
    }
}