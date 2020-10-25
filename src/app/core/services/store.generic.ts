import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export abstract class StoreGeneric<T> {
    protected bs: BehaviorSubject<T>;
    state$: Observable<T>;
    state: T;
    previous: T;

    protected abstract store: string;

    constructor(
        initialValue: Partial<T>,
    ) {
        this.bs = new BehaviorSubject(initialValue as T);
        this.state$ = this.bs.asObservable();
        this.state = initialValue as T;

        this.state$.subscribe(s => this.state = s);
    }

    patch(newValue: Partial<T>, event: string = 'not specified'): void {
        this.previous = this.state;
        const newState = Object.assign({}, this.state, newValue);

        if (environment.production === false) {
            console.groupCollapsed(`[${this.store}] [patch] [event: ${event}]`);
            console.log(
                ...['change', newValue],
                ...['previous', this.previous],
                ...['next', newState]
            );
            console.groupEnd();
        }

        this.bs.next(newState);
    }

    setValue(newValue: Partial<T>, event: string = 'not specified'): void {
        this.previous = this.state;
        const newState = Object.assign({}, newValue) as T;

        if (environment.production === false) {
            console.groupCollapsed(`[${this.store} store] [setValue] [event: ${event}]`);
            console.log(
                ...['change', newValue],
                ...['previous', this.previous],
                ...['next', newState]
            );
            console.groupEnd();
        }

        this.bs.next(newState);
    }
}
