import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdvanced } from './contact-advanced';

describe('ContactAdvanced', () => {
  let component: ContactAdvanced;
  let fixture: ComponentFixture<ContactAdvanced>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAdvanced]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAdvanced);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
