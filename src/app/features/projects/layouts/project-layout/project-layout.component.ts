import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormDialogComponent } from '../../project-form-dialog/project-form-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-project-layout',
  imports: [RouterOutlet,MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLayoutComponent {
  constructor(private dialog: MatDialog) {}

  openNewProjectDialog() {
    this.dialog.open(ProjectFormDialogComponent, {data: {}});
  }
}
