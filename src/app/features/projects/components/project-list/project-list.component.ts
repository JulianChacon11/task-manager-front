import { ChangeDetectionStrategy, Component, ViewChild, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../interfaces/project.interface';
import { DatePipe } from '@angular/common';
import { MenuProjectListComponent } from "../../menu-project-list/menu-project-list.component";
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormDialogComponent } from '../../project-form-dialog/project-form-dialog.component';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'project-list',
  imports: [RouterLink, DatePipe, MenuProjectListComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectListComponent {
  @ViewChild(MenuProjectListComponent) menuComponent?: MenuProjectListComponent;

  constructor(private dialog: MatDialog, private projectsService: ProjectsService) {}
  projects = input.required<Project[]>();

  onDelete(id: string) {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        // ...actualiza la lista si es necesario...
        this.menuComponent?.closeMenu(); // Cierra el menú manualmente
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      }
    });
  }
    openNewProjectDialog() {
    this.dialog.open(ProjectFormDialogComponent, {data: {}});
  }

  onEdit(project: Project) {
    this.dialog.open(ProjectFormDialogComponent, {
      data: { project }
    });
    this.menuComponent?.closeMenu(); // Cierra el menú manualmente
  }
}
