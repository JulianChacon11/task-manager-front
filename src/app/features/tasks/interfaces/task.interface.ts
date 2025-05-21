export interface Task {
  descripcion: string,
  fechaFin: Date,
  fechaInicio: Date,
  id: string,
  idProyecto: string,
  idUsuario: string,
  nombre: string,
  time: number,
  estado: number,
}
