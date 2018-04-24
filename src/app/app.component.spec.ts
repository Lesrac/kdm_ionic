import { TestBed } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { KDMDataServiceMock } from '../mock/mocks';
import { KDMDataService } from '../service/kdm-data.service';

describe('MyApp Component', () => {
  let fixture;
  let component;

  let kdmServiceMock: KDMDataServiceMock;

  beforeEach(() => {
    kdmServiceMock = new KDMDataServiceMock();
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp),
      ],
      providers: [
        StatusBar,
        SplashScreen,
        {provide: KDMDataService, useValue: kdmServiceMock},
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

});
