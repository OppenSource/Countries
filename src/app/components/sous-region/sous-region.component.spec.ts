import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousRegionComponent } from './sous-region.component';

describe('SousRegionComponent', () => {
  let component: SousRegionComponent;
  let fixture: ComponentFixture<SousRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousRegionComponent]
    });
    fixture = TestBed.createComponent(SousRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
