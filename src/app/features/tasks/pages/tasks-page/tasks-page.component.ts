import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskBoardComponent } from '../../components/task-board/task-board.component';
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
  projectId = inject(ActivatedRoute).snapshot.params['id'];

  taskResource = rxResource({
    request: () => ({projectId: this.projectId}),
    loader: ({ request }) => {
      return this.taskService.getProjectTasks(request.projectId);
    },
  });

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        mode: 'add',
        projectId: this.projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taskResource.reload();
      }
    });
  }
}
