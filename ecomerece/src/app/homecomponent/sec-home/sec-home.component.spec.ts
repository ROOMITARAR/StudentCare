import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecHomeComponent } from './sec-home.component';

describe('SecHomeComponent', () => {
  let component: SecHomeComponent;
  let fixture: ComponentFixture<SecHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecHomeComponent]
    });
    fixture = TestBed.createComponent(SecHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
