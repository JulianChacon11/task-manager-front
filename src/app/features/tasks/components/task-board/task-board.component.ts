import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject, // Import effect
  input,
  signal,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from '../../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'tasks-task-board',
  imports: [CdkDropList, CdkDrag, MatIconModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  taskService = inject(TasksService);

  tasks = input.required<Task[]>();
  todo = signal<Task[]>([]);
  inProgress = signal<Task[]>([]);
  done = signal<Task[]>([]);


  tasksEffect = effect(() => {
    const currentTasks = this.tasks();
    this.todo.set(currentTasks.filter((task) => task.estado === 0));
    this.inProgress.set(currentTasks.filter((task) => task.estado === 1));
    this.done.set(currentTasks.filter((task) => task.estado === 2));
  });

  drop(event: CdkDragDrop<Task[]>) {
    const task = event.item.data as Task;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const newContainerId = (
        event.container.element.nativeElement as HTMLElement
      ).id;
      let newEstado: number | undefined;

      if (newContainerId === 'todoList') {
        newEstado = 0;
      } else if (newContainerId === 'inProgressList') {
        newEstado = 1;
      } else if (newContainerId === 'doneList') {
        newEstado = 2;
      }

      if (newEstado !== undefined && task.estado !== newEstado) {
        task.estado = newEstado;
        this.taskService.updateTask(task).subscribe({
          next: () => {
            console.log(`Task '${task.nombre}' status updated to: ${task.estado}`);
          },
          error: (err) => {
            console.error('Error updating task:', err);
          },
        });
      }
    }
  }

  openTaskDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    task?: Task
  ): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        task,
        mode: 'view',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }
}
