import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent { }
