import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoMapComponent } from './go-map.component';

describe('GoMapComponent', () => {
  let component: GoMapComponent;
  let fixture: ComponentFixture<GoMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
