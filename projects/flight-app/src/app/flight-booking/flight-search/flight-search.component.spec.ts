import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import { By } from '@angular/platform-browser';

describe('flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightSearchComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        // Add providers necessary for the test
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not have any flights loaded initially', () => {
      expect(component.flights.length).toBe(0);
  });

  it('should load flights when user entered from and to', () => {
    component.from = 'Graz';
    component.to = 'Hamburg';
    component.search();

    let httpTestingController: HttpTestingController 
                        = TestBed.get(HttpTestingController);

    const req = httpTestingController.expectOne(
      'http://www.angular.at/api/flight?from=Graz&to=Hamburg'
    );
    // req.request.method === 'GET'
    
    req.flush([{ id: 22, from: 'Graz', to: 'Hamburg', date: ''}]);

    expect(component.flights.length).toBe(1);
  });
});

describe('flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  let result = [
    { id: 17, from: 'Graz', to: 'Hamburg', date: 'now', delayed: true},
    { id: 18, from: 'Vienna', to: 'Barcelona', date: 'now', delayed: true },
    { id: 19, from: 'Frankfurt', to: 'Salzburg', date: 'now', delayed: true },
  ];

  let flightServiceMock = {
    find(from: string, to: string): Observable<Flight[]> {
        return of(result);
    },
    // The following methods may not be used in your demo app
    flights: [],
    load(from: string, to: string): void {
        this.find(from, to).subscribe(f => { this.flights = f; })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightSearchComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        // Add providers necessary for the test
      ]
    })
    .overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          {
            provide: FlightService,
            useValue: flightServiceMock
            // depending on your implementation
            // use provide: AbstractFlightService instead
          }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not load flights w/o from and to', () => {
    component.from = '';
    component.to = '';
    component.search();

    expect(component.flights.length).toBe(0);
  });

  it('should not load flights w/ from and to', () => {
      component.from = 'Hamburg';
      component.to = 'Graz';
      component.search();

      expect(component.flights.length).toBe(3);
  });

  it('should have a disabled search button w/o params', fakeAsync(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);

    // Intial Databinding, ngOnInit
    fixture.detectChanges();
    tick();

    // Get input field for from
    let from = fixture
                  .debugElement
                  .query(By.css('input[name=from]'))
                  .nativeElement;

    from.value = '';
    from.dispatchEvent(new Event('input'));

    // Get input field for to
    let to = fixture
              .debugElement
              .query(By.css('input[name=to]'))
              .nativeElement;

    to.value = '';
    to.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    // get disabled
    let disabled = fixture
                    .debugElement
                    .query(By.css('button'))
                    .properties['disabled'];
    
    expect(disabled).toBeTruthy();
  }));
});   