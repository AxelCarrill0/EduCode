import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesContentComponent } from './modules-content.component';

describe('ModulesContentComponent', () => {
  let component: ModulesContentComponent;
  let fixture: ComponentFixture<ModulesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
