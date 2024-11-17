import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersShowComponent } from './suppliers-show.component';

describe('SuppliersShowComponent', () => {
  let component: SuppliersShowComponent;
  let fixture: ComponentFixture<SuppliersShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
