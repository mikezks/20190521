import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, share, takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.timer$ =
      timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        //take(5),
        tap(value => console.log('Observable logic')),
        //share()
      );

    this.timerSubscription =
      this.timer$        
        .subscribe(
          console.log
        );
  }

  ngOnDestroy(): void {
    //this.timerSubscription.unsubscribe();
    this.destroy$.next(true);
  }
}
