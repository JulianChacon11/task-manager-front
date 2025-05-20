import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-project-list',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './menu-project-list.component.html',
  styleUrl: './menu-project-list.component.css'
})
export class MenuProjectListComponent {
  @Output() editProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<void>();
  
  @ViewChild(MatMenuTrigger) menuTrigger?: MatMenuTrigger;
  closeMenu() {
    console.log('closeMenu llamado');
    this.menuTrigger?.closeMenu();
  }
}