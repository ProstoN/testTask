import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationMovieComponent } from './recommendation-movie.component';

describe('RecommendationMovieComponent', () => {
  let component: RecommendationMovieComponent;
  let fixture: ComponentFixture<RecommendationMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
