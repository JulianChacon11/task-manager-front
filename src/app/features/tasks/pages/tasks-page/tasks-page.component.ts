import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskBoardComponent } from '../../components/task-board/task-board.component';
import { Task } from '../../interfaces/task.interface';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  imports: [TaskBoardComponent, MatIconModule],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksPageComponent {
  readonly dialog = inject(MatDialog);
  taskService = inject(TasksService);
  taskId = inject(ActivatedRoute).snapshot.params['id'];

  taskResource = rxResource({
    loader: () => {
      const result$ = this.taskService.getAllTasks();
      result$.subscribe((data) => console.log('Desde loader:', data));
      return result$;
    },
  });

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(TaskFormComponent, {
      width: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        mode: 'add',
      },
    });
  }
}
