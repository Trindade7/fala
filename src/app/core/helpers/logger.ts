import { environment } from '@app-envs/environment';

export class Logger {

    /**
     *
     * Starts a groupCollapsed log that has to be Closed
     * with closeCollapsed()
     */
    static startCollapsed(title: string, logs: any[] = []): void {
        if (environment.production === false) {
            console.groupCollapsed(title);
            console.log(...logs);
        }
    }
    /**
     *
     * console.log a list of data, to be used between startCollapsed
     * and closeCollapsed()
     */
    static groupCollapsed(logs: any[]): void {
        if (environment.production === false) {
            console.log(...logs);
        }
    }
    /**
     *
     * Logs the data and Ends a groupCollapsed log
     * started with  startCollapsed()
     */
    static endCollapsed(logs: any[] = []): void {
        if (environment.production === false) {
            console.log(...logs);
            console.groupEnd();
        }
    }

    /**
     *
     * Createsstarts and ends a groupCollapsed log
     * can be used between startCollapsed() and endCollapsed()
     */
    static collapsed(title: string, logs: any[] = []): void {
        if (environment.production === false) {
            console.groupCollapsed(title);
            console.log(...logs);
            console.groupEnd();
        }
    }
}
