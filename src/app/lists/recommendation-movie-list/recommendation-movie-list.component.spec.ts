import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationMovieListComponent } from './recommendation-movie-list.component';

describe('RecommendationMovieListComponent', () => {
  let component: RecommendationMovieListComponent;
  let fixture: ComponentFixture<RecommendationMovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationMovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
