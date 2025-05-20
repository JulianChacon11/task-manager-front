import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskBoardComponent } from '../../components/task-board/task-board.component';
import { Task } from '../../interfaces/task.interface';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  imports: [TaskBoardComponent, MatIconModule],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksPageComponent {

  readonly dialog = inject(MatDialog);

   tasks: Task[] = [
    {
      id: '1',
      nombreTarea: 'Diseñar la interfaz de usuario',
      descripcion:
        'Crear los mockups y el diseño visual para la nueva aplicación móvil.',
      fechaInicio: new Date('2025-06-01T09:00:00.000Z'),
      fechaFin: new Date('2025-06-15T17:00:00.000Z'),
      time: 80,
      idUsuario: 'usuario_abc',
      idProyecto: 'proyecto_xyz',
      estado: 'to-do',
    },
    {
      id: '2',
      nombreTarea: 'Desarrollar el backend',
      descripcion:
        'Implementar la API REST y la lógica de negocio del servidor.',
      fechaInicio: new Date('2025-06-10T09:00:00.000Z'),
      fechaFin: new Date('2025-07-10T17:00:00.000Z'),
      time: 160,
      idUsuario: 'usuario_def',
      idProyecto: 'proyecto_xyz',
      estado: 'to-do',
    },
    {
      id: '3',
      nombreTarea: 'Realizar pruebas de QA',
      descripcion: 'Ejecutar casos de prueba y reportar bugs.',
      fechaInicio: new Date('2025-07-05T09:00:00.000Z'),
      fechaFin: new Date('2025-07-20T17:00:00.000Z'),
      time: 60,
      idUsuario: 'usuario_ghi',
      idProyecto: 'proyecto_xyz',
      estado: 'to-do',
    },
    {
      id: '4',
      nombreTarea: 'Configurar el entorno de producción',
      descripcion:
        'Preparar y configurar los servidores para el despliegue de la aplicación.',
      fechaInicio: new Date('2025-07-15T09:00:00.000Z'),
      fechaFin: new Date('2025-07-25T17:00:00.000Z'),
      time: 40,
      idUsuario: 'usuario_jkl',
      idProyecto: 'proyecto_xyz',
      estado: 'done',
    },
    {
      id: '5',
      nombreTarea: 'Escribir la documentación del usuario',
      descripcion:
        'Crear manuales y guías para los usuarios finales de la aplicación.',
      fechaInicio: new Date('2025-07-20T09:00:00.000Z'),
      fechaFin: new Date('2025-08-05T17:00:00.000Z'),
      time: 50,
      idUsuario: 'usuario_mno',
      idProyecto: 'proyecto_xyz',
      estado: 'done',
    },
    {
      id: '6',
      nombreTarea: 'Desplegar la aplicación',
      descripcion: 'Poner en producción la versión final de la aplicación.',
      fechaInicio: new Date('2025-08-01T09:00:00.000Z'),
      fechaFin: new Date('2025-08-10T17:00:00.000Z'),
      time: 30,
      idUsuario: 'usuario_pqr',
      idProyecto: 'proyecto_xyz',
      estado: 'done',
    },

    {
      id: '7',
      nombreTarea: 'Revisión de código del módulo de pagos',
      descripcion:
        'Realizar una revisión exhaustiva del código implementado para el procesamiento de pagos.',
      fechaInicio: new Date('2025-05-22T10:00:00.000Z'),
      fechaFin: new Date('2025-05-24T18:00:00.000Z'),
      time: 16,
      idUsuario: 'usuario_stu',
      idProyecto: 'proyecto_abc',
      estado: 'in-progress',
    },
    {
      id: '8',
      nombreTarea: 'Integración con API de terceros',
      descripcion: 'Conectar la aplicación con un servicio externo de mapas.',
      fechaInicio: new Date('2025-06-05T09:00:00.000Z'),
      fechaFin: new Date('2025-06-12T17:00:00.000Z'),
      time: 56,
      idUsuario: 'usuario_vwx',
      idProyecto: 'proyecto_def',
      estado: 'in-progress',
    },
    {
      id: '9',
      nombreTarea: 'Optimización de consultas a base de datos',
      descripcion:
        'Analizar y mejorar el rendimiento de las consultas SQL más lentas.',
      fechaInicio: new Date('2025-06-18T14:00:00.000Z'),
      fechaFin: new Date('2025-06-25T18:00:00.000Z'),
      time: 32,
      idUsuario: 'usuario_yz',
      idProyecto: 'proyecto_ghi',
      estado: 'in-progress',
    }
  ];

   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TaskFormComponent, {
      width: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        mode: 'add'
      }
    });
  }
}
