import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  timer,
  Observable,
  Subscription,
  Subject,
  iif,
  of,
  interval,
  combineLatest
} from 'rxjs';
import {
  tap,
  share,
  takeUntil,
  take,
  debounceTime,
  filter,
  distinctUntilChanged,
  switchMap,
  delay,
  startWith,
  map
} from 'rxjs/operators';
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
  online$: Observable<boolean>;
  online: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();

    this.online$ = interval(2000)
      .pipe(
        startWith(0),
        map(x => Math.random() < 0.5),
        distinctUntilChanged(),
        tap(x => this.online = x)
      );

    this.flights$ =
      this.control.valueChanges
        .pipe(
          value => combineLatest(value, this.online$),
          filter(([value, online]) => online),
          map (([value, online]) => value),
          distinctUntilChanged(),
          debounceTime(300),
          switchMap((value: string) =>
            iif(
              () => value.length > 2,
              of(value)
                .pipe(
                  tap(() => this.loading = true),
                  switchMap(value => this.load(value)),
                  tap(() => this.loading = false)
                ),
              of([])
            )
          )
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
