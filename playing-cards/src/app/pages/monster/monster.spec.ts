import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Monster } from './monster';

describe('Monster', () => {
  let component: Monster;
  let fixture: ComponentFixture<Monster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Monster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Monster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
