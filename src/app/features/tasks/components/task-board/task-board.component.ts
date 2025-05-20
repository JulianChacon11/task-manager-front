import {
  ChangeDetectionStrategy,
  Component,
  effect, inject, // Import effect
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


@Component({
  selector: 'tasks-task-board',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {

  readonly dialog = inject(MatDialog);
  tasks = input.required<Task[]>();
  todo = signal<Task[]>([]);
  inProgress = signal<Task[]>([]);
  done = signal<Task[]>([]);


  tasksEffect = effect(() => {
    const currentTasks = this.tasks();
    this.todo.set(currentTasks.filter((task) => task.estado === 'to-do'));
    this.inProgress.set(currentTasks.filter((task) => task.estado === 'in-progress'));
    this.done.set(currentTasks.filter((task) => task.estado === 'done'));
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

      const newContainerId = (event.container.element.nativeElement as HTMLElement).id;
      let newEstado = '';

      if (newContainerId === 'todoList') {
        newEstado = 'to-do';
      } else if (newContainerId === 'inProgressList') {
        newEstado = 'in-progress';
      } else if (newContainerId === 'doneList') {
        newEstado = 'done';
      }

      if (newEstado && task.estado !== newEstado) {
        task.estado = newEstado;
        console.log(`Task '${task.nombreTarea}' status updated to: ${task.estado}`);
      }
    }
  }

  openTaskDialog(enterAnimationDuration: string, exitAnimationDuration: string, task?: Task): void {
      this.dialog.open(TaskFormComponent, {
        width: 'fit-content',
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          task,
          mode: 'view',
        }
      });
    }
}
