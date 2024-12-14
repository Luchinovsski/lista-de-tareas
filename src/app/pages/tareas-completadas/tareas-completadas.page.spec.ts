import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasCompletadasPage } from './tareas-completadas.page';

describe('TareasCompletadasPage', () => {
  let component: TareasCompletadasPage;
  let fixture: ComponentFixture<TareasCompletadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasCompletadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
