import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoDetail } from './repo-detail';

describe('RepoDetail', () => {
  let component: RepoDetail;
  let fixture: ComponentFixture<RepoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
