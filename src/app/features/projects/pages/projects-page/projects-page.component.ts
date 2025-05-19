import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { RouterOutlet } from '@angular/router';

const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu'
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu'
  },
  {
    id: 3,
    name: 'Project 3',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu'
  }
];

@Component({
  imports: [ProjectListComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPageComponent {

  projects = signal(projects);
}
