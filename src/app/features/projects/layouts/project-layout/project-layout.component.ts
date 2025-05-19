import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-layout',
  imports: [RouterOutlet],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLayoutComponent { }
