import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartComposeComponent } from './smart-compose.component';

describe('SmartComposeComponent', () => {
  let component: SmartComposeComponent;
  let fixture: ComponentFixture<SmartComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartComposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
