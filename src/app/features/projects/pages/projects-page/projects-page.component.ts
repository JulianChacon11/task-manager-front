import { ChangeDetectionStrategy, Component, signal, OnInit, inject } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { Project } from '../../interfaces/project.interface';
import { ProjectsService } from '../../services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormDialogComponent } from '../../project-form-dialog/project-form-dialog.component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  imports: [ProjectListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {

  // projects = signal<Project[]>([]);
  projectService = inject(ProjectsService);
  private dialog = inject(MatDialog);

  projectsResource = rxResource({
    request: () => ({}),
    loader: () => this.projectService.getProjects(),
  })

  // ngOnInit(): void {
  //   console.log('ProjectsPageComponent initialized');
  //   this.loadProjects();
  // }

  // loadProjects() {
  //   this.projectsService.getProjects().subscribe({
  //     next: (projects) => this.projects.set(projects),
  //     error: (err) => console.error('Error fetching projects:', err)
  //   });
  // }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, { data: {} });
    console.log('Dialog opened');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if (result) {
        this.projectsResource.reload();
      }
    });
  }

  openEditProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectFormDialogComponent, { data: { project } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectsResource.reload();
      }
    });
  }
}
