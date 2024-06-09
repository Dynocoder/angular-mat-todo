import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  templateUrl: './add-edit-todo-dialog.component.html',
  styleUrl: './add-edit-todo-dialog.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AddEditTodoDialogComponent {

  todo!: string;

  constructor(
    private dialogRef: MatDialogRef<AddEditTodoDialogComponent>,
  ) {
    this.todo = "";
  }



  create(): void {
    this.dialogRef.close(this.todo);
  }

  close(): void {
    this.dialogRef.close();
  }



}
