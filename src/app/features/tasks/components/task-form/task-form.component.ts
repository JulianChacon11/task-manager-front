import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Project } from '../../../projects/interfaces/project.interface';
import { Task } from '../../interfaces/task.interface';
import { MatIconModule } from '@angular/material/icon';
import { FormUtils } from '../../../../utils/form.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { DeleteConfirmationDialogComponent } from '../../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

enum TaskStatus {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

@Component({
  selector: 'app-task-form',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  readonly dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  private TasksService = inject(TasksService);
  private router = inject(Router);
  data: { task?: Task; mode: string; projectId?: string } =
    inject(MAT_DIALOG_DATA);

  formUtils = FormUtils;

  tasksStatusEnum = TaskStatus;
  modalTitle = signal<string>('');
  isEditing = signal<boolean>(false);
  taskStatusOptions = Object.keys(TaskStatus)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: TaskStatus[key as keyof typeof TaskStatus],
    }));

  taskForm: FormGroup = new FormGroup({});

  constructor() {
    this.taskForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(10),
        ],
      ],
      tiempo: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      estado: [this.tasksStatusEnum.TODO, [Validators.required]],
      fechaFin: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.setDialogTitle();
    this.formInit();
  }

  formInit() {
    if (this.data.task && this.data.mode === 'view') {
      this.taskForm.patchValue({
        nombre: this.data.task.nombre,
        descripcion: this.data.task.descripcion,
        tiempo: this.data.task.tiempo,
        estado: this.data.task.estado,
        fechaFin: this.data.task.fechaFin,
      });
    }

    if (this.data.mode === 'view') {
      this.taskForm.disable();
      this.isEditing.set(false);
    }
  }

  setDialogTitle() {
    if (this.data.mode === 'view') {
      this.modalTitle.set('View');
      return;
    }
    this.modalTitle.set('Add');
  }

  onTaskEdit() {
    if (!this.taskForm) return;
    this.isEditing.set(!this.isEditing());
    this.isEditing() ? this.taskForm.enable() : this.taskForm.disable();
  }

  onFormSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.data.mode === 'add') {
      const newTask: Task = {
        ...this.taskForm.value,
        fechaFin: this.taskForm.value.fechaFin.toISOString(),
        fechaInicio: new Date().toISOString(),
        idProyecto: this.data.projectId,
        idUsuario: '073208B6-4D83-4211-AD52-57F2CE5ACAC0',
      };
      this.TasksService.createTask(newTask).subscribe((response) => {
        this.dialogRef.close(true);
      });
    }

    if (this.isEditing() === true && this.data.mode === 'view') {
      const taskToUpdate: Task = {
        ...this.data.task,
        ...this.taskForm.value,
      };
      this.TasksService.updateTask(taskToUpdate).subscribe((response) => {
        this.dialogRef.close(true);
      });
    }
    console.log(this.taskForm.value);
  }

  onDeleteTask() {
    const confirmDialogRef = this.dialog.open(
      DeleteConfirmationDialogComponent,
      {
        width: 'fit-content',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: {
          title: 'Delete Task',
          message: 'Are you sure you want to delete this task?',
        },
      }
    );
    confirmDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && this.data.task?.id) {
        this.TasksService.deleteTask(this.data.task.id).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    });
  }
}
