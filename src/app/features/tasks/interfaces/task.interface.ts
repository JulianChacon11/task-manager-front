export interface Task {
  descripcion: string,
  fechaFin: Date,
  fechaInicio: Date,
  id: string,
  idProyecto: string,
  idUsuario: string,
  nombre: string,
  tiempo: number,
  estado: number,
}
