import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TafutaaCameraPage } from './tafutaa-camera.page';

describe('TafutaaCameraPage', () => {
  let component: TafutaaCameraPage;
  let fixture: ComponentFixture<TafutaaCameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TafutaaCameraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TafutaaCameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
