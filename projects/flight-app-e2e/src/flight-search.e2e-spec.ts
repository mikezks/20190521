import { ElementFinder, ElementArrayFinder, browser, element, by } from "protractor";

describe('Flight Search E2E Test', () => {
    let from: ElementFinder;
    let to: ElementFinder;
    let search: ElementFinder;
    let flights: ElementArrayFinder;
    let firstFlight: ElementFinder;
    let firstFlightBgColor: ElementFinder;
    let select: ElementFinder;

    beforeEach(() => {
        browser.get('http://localhost:4299');
        // Maximize browser to show sidebar and flight-search item
        browser.manage().window().maximize();
        
        // Navigate to flight-search component
        const navigate = element(by.css('[routerlink="flight-booking/flight-search"]'));
        navigate.click();
        
        from = element(by.css('input[name=from]'));
        from.clear();
        from.sendKeys('Graz');

        to = element(by.css('input[name=to]'));
        to.clear();
        to.sendKeys('Hamburg');

        search = element(by.cssContainingText('button', 'Search'));
        search.click();

        const tbody = element(by.tagName('tbody'));
        flights = tbody.all(by.tagName('tr'));
        firstFlight = flights.first();
        firstFlightBgColor = firstFlight.element(by.tagName('td'));
        select = element(by.cssContainingText('a', 'Select'));
    });

    it('should show one flight row after search', () => {
        expect(flights.count()).toBe(1);
    });

    it('should verify card background color change: initially/unselected, after mouse click select', () => {
        //const selectFlight = td.element(by.cssContainingText('button mat-icon', 'add'));
        const none = 'rgba(0, 0, 0, 0)';
        const selectedColor = 'rgba(245, 245, 245, 1)';

        // Check CSS background-color as RGBA value
        let cellBackground = firstFlightBgColor.getCssValue('background-color');
        expect(cellBackground).toBe(none);

        // MouseClick to select flight card
        // Check CSS background-color as RGBA value
        browser.sleep(1000);
        browser.actions().mouseMove(select).perform();
        browser.actions().click().perform();
        cellBackground = firstFlightBgColor.getCssValue('background-color');
        expect(cellBackground).toBe(selectedColor);
        browser.sleep(1000);
    });
});
