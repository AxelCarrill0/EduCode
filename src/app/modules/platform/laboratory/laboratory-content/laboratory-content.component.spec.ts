import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryContentComponent } from './laboratory-content.component';

describe('LaboratoryContentComponent', () => {
  let component: LaboratoryContentComponent;
  let fixture: ComponentFixture<LaboratoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoryContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaboratoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
