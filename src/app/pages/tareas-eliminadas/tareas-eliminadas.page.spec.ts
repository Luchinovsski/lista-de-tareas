import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasEliminadasPage } from './tareas-eliminadas.page';

describe('TareasEliminadasPage', () => {
  let component: TareasEliminadasPage;
  let fixture: ComponentFixture<TareasEliminadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasEliminadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
