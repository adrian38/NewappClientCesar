import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FotosProyectoPage } from './fotos-proyecto.page';

describe('FotosProyectoPage', () => {
  let component: FotosProyectoPage;
  let fixture: ComponentFixture<FotosProyectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotosProyectoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FotosProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
