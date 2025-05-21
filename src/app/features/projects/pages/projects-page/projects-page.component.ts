import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { Project } from '../../interfaces/project.interface';
import { ProjectsService } from '../../services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormDialogComponent } from '../../project-form-dialog/project-form-dialog.component';

@Component({
  imports: [ProjectListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent implements OnInit {

  projects = signal<Project[]>([]);

  constructor(private projectsService: ProjectsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('ProjectsPageComponent initialized');
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: (err) => console.error('Error fetching projects:', err)
    });
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, { data: {} });
    console.log('Dialog opened');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if (result) {
        this.loadProjects(); // Refresca la lista si se creó un proyecto
      }
    });
  }

  openEditProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, { data: { project } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects(); // Refresca la lista si se editó un proyecto
      }
    });
  }
}
