import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-board',
  imports: [],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent { }
