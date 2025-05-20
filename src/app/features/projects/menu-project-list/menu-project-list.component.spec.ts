import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjectListComponent } from './menu-project-list.component';

describe('MenuProjectListComponent', () => {
  let component: MenuProjectListComponent;
  let fixture: ComponentFixture<MenuProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
