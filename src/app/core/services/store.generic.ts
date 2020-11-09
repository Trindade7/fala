import { Logger as logger } from '@app-core/helpers/logger';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class StoreGeneric<T> {
    protected bs: BehaviorSubject<T>;
    state$: Observable<T>;
    state: T;
    previous: T | undefined;

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
        logger.collapsed(`[${this.store}] [patch] [event: ${event}]`,
            [
                ...['change', newValue],
                ...['previous', this.previous],
                ...['next', newState]
            ],
        );

        this.bs.next(newState);
    }

    setValue(newValue: Partial<T>, event: string = 'not specified'): void {
        this.previous = this.state;
        const newState = Object.assign({}, newValue) as T;

        logger.collapsed(`[${this.store}] [setValue] [event: ${event}]`,
            [
                ...['change', newValue],
                ...['previous', this.previous],
                ...['next', newState]
            ],
        );

        this.bs.next(newState);
    }
}
