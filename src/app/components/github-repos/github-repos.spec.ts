import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepos } from './github-repos';

describe('GithubRepos', () => {
  let component: GithubRepos;
  let fixture: ComponentFixture<GithubRepos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubRepos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubRepos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
