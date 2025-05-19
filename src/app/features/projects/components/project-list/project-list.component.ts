import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'asdsad'
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'asdsad'
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'asdsad'
  }
];

@Component({
  selector: 'project-list',
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectListComponent {

  projects = signal(projects);

}
