import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, share, takeUntil, take, debounceTime, filter, distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '../../entities/flight';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();

    this.flights$	=
      this.control.valueChanges
        .pipe(
          debounceTime(300),
          filter((value: string) => value.length > 2),
          distinctUntilChanged(),
          tap(() => this.loading = true),
          switchMap(from => this.load(from)
            /* .pipe(
              delay(2000)
            ) */
          ),
          tap(() => this.loading = false)
        );
  }

  load(from: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    const params = new HttpParams()
      .set('from', from);

    return this.http
      .get<Flight[]>(url, { headers, params });
  }

  rxjsDemo(): void {
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
