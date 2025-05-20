import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { Project } from '../../interfaces/project.interface';

const projects: Project[] = [
  {
    id: "1",
    nombre: 'Project 1',
    descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu',
    fechaInicio: new Date('2025-05-20'),
    fechaFin: new Date('2025-05-22')
  },
  {
    id: "2",
    nombre: 'Project 2',
    descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu',
    fechaInicio: new Date('2025-05-20'),
    fechaFin: new Date('2025-05-22')
  },
  {
    id:"3" ,
    nombre: 'Project 3',
    descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, laudantium incidunt vitae facere natus sunt ratione neque voluptatem fugiat cumqu',
    fechaInicio: new Date('2025-05-20'),
    fechaFin: new Date('2025-05-22')
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
