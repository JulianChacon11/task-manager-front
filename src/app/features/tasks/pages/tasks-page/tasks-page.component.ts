import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  imports: [],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent { }
