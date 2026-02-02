import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMonsterConfirmationDialog } from './delete-monster-confirmation-dialog';

describe('DeleteMonsterConfirmationDialog', () => {
  let component: DeleteMonsterConfirmationDialog;
  let fixture: ComponentFixture<DeleteMonsterConfirmationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMonsterConfirmationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMonsterConfirmationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
