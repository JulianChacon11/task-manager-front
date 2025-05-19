import { Routes } from "@angular/router";
import ProjectsPageComponent from "./pages/projects-page/projects-page.component";
import TasksPageComponent from "../tasks/pages/tasks-page/tasks-page.component";
import { ProjectLayoutComponent } from "./layouts/project-layout/project-layout.component";

export const ProjectsRoutes: Routes = [

  {
    path: '',
    component: ProjectLayoutComponent,
    children: [
      {
        path: '',
        component: ProjectsPageComponent,
      },
      {
        path: ':query/tasks',
        component: TasksPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'projects'
  }
]
export default ProjectsRoutes;
