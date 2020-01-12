import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewDialogComponent } from './menu-view-dialog.component';

describe('MenuViewDialogComponent', () => {
  let component: MenuViewDialogComponent;
  let fixture: ComponentFixture<MenuViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
