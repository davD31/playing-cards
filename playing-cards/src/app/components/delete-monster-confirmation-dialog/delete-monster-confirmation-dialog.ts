import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-monster-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-monster-confirmation-dialog.html',
  styleUrl: './delete-monster-confirmation-dialog.css'
})
export class DeleteMonsterConfirmationDialog {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteMonsterConfirmationDialog>);
}