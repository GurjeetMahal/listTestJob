import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MessageComponentModule } from '../message/message.module';

import { HomePage } from './home.page';
import { DataService } from '../services/data.service';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it("should use the messages from the service", async() => {
    const dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    expect(dataService._message$).toEqual(component.messages$);
  });

  it(`should have message count`, async() => {
    expect(component.messageCount$).toBeTruthy();
  });

  it(`should have messages`, async () => {
    expect(component.messages$).toBeTruthy();
  });

  it(`should have search field`, async () => {
    fixture.detectChanges();
    const searchField = fixture.debugElement.nativeElement.querySelector('ion-searchbar');
    expect(searchField).toBeTruthy();
  });

  it(`should have counter in the html`, async () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#counter')).nativeElement;
    expect(element).toBeTruthy();
  });

  it(`search working`, async () => {
    const dataService = fixture.debugElement.injector.get(DataService);
    fixture.detectChanges();
    const searchText = dataService.messages[0].fromName;
    component.onSearchChange(searchText);
    let messages;
    component.messages$.subscribe(data => {
      messages = data
    })
    expect(messages.length).toBeGreaterThan(0)
  });
});
