import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskBoardComponent } from '../../components/task-board/task-board.component';

@Component({
  imports: [TaskBoardComponent],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksPageComponent { }
