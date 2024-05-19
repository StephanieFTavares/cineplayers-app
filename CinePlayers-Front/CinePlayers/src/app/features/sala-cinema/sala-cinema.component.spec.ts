import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaCinemaComponent } from './sala-cinema.component';

describe('SalaCinemaComponent', () => {
  let component: SalaCinemaComponent;
  let fixture: ComponentFixture<SalaCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaCinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
