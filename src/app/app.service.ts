import { ViewportRuler } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export const enum DevicModeEnum {
  MOBILE,
  WIDESCREEN
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private windowSizeBs: BehaviorSubject<number>;
  windowWidth$: Observable<number>;
  private currentWindowSizeModeVal: number;

  constructor (
    // private zone: NgZone,
    private viewPortRuler: ViewportRuler
  ) {
    this.currentWindowSizeModeVal = window.innerWidth;
    this.windowSizeBs = new BehaviorSubject(window.innerWidth);
    this.windowWidth$ = this.windowSizeBs.asObservable();

    this.viewPortRuler.change().pipe(
      debounceTime(500)
    ).subscribe(
      () => {
        console.log('neww win size ');
        console.log(window.innerWidth);

        this.windowSizeBs.next(window.innerWidth);
      }
    );
  }

  getWindowSizeMode(windowWidth: number): DevicModeEnum {
    return windowWidth > 700 ? DevicModeEnum.WIDESCREEN : DevicModeEnum.MOBILE;
  }

  get currentWindowSizeMode() {
    return this.currentWindowSizeModeVal;
  }
  set currentWindowSizeMode(width: number) {
    this.currentWindowSizeModeVal = width;
  }
}
