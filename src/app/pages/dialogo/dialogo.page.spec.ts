import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogoPage } from './dialogo.page';

describe('DialogoPage', () => {
  let component: DialogoPage;
  let fixture: ComponentFixture<DialogoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
