import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  Form,
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

enum TaskStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
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
  private formBuilder = inject(FormBuilder);
  data: { task: Task; mode: string } = inject(MAT_DIALOG_DATA);

  tasksStatusEnum = TaskStatus;
  modalTitle = signal<string>('');
  isEditing = signal<boolean>(false);
  statusOptions = Object.values(TaskStatus);

  taskForm: FormGroup = new FormGroup({});

  constructor() {
    this.taskForm = this.formBuilder.group({
      nombreTarea: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(10)]],
      duracion: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      estado: [this.tasksStatusEnum.TODO, [Validators.required]],
      fechaFin: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.setDialogTitle();
    this.formInit();
  }

  formInit() {
    if (this.data.task && this.data.mode === 'view' ) {
      this.taskForm.patchValue({
        nombreTarea: this.data.task.nombreTarea,
        descripcion: this.data.task.descripcion,
        duracion: this.data.task.time,
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
    this.modalTitle.set('Add')
  }

  onTaskEdit() {
    if( !this.taskForm ) return;
    this.isEditing.set(!this.isEditing());
    this.isEditing() ? this.taskForm.enable() : this.taskForm.disable();
  }

  onFormSubmit() {
    // TODO--Implementar logica cuando edita o cuando crea una tarea nueva
    console.log(this.taskForm.value);
  }
}
