import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../interfaces/project.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatIconModule, MatDatepickerModule, 
    MatNativeDateModule,ReactiveFormsModule ],
    providers: [provideNativeDateAdapter()],
})
export class ProjectFormDialogComponent {
  form: FormGroup;
  isEdit: boolean;

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<ProjectFormDialogComponent>,
  private projectsService: ProjectsService,
  @Inject(MAT_DIALOG_DATA) public data: { project?: Project } = {}
) {
  this.isEdit = !!this.data.project;
  this.form = this.fb.group({
    nombre: [this.data.project?.nombre || '', Validators.required],
    fechaInicio: [this.data.project?.fechaInicio || '', Validators.required],
    fechaFin: [this.data.project?.fechaFin || '', Validators.required],
    descripcion: [this.data.project?.descripcion || '', Validators.required]
  });
}

  save() {
    if (this.form.invalid) return;
    const project: Project = {
      ...this.data.project,
      ...this.form.value
    };
    if (this.isEdit) {
      this.projectsService.updateProject(project.id, project).subscribe(() => this.dialogRef.close(true));
    } else {
      this.projectsService.createProject(project).subscribe(() => this.dialogRef.close(true));
    }
  }

  close() {
    this.dialogRef.close();
  }
}
