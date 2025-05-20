import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../interfaces/project.interface';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'project-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectListComponent {

  projects = input.required<Project[]>();
}
