import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterList } from './monster-list';

describe('MonsterList', () => {
  let component: MonsterList;
  let fixture: ComponentFixture<MonsterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
