import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavFilmComponent } from './fav-film.component';

describe('FavFilmComponent', () => {
  let component: FavFilmComponent;
  let fixture: ComponentFixture<FavFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
