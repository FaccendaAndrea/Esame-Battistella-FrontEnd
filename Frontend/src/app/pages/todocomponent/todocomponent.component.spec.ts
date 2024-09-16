import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodocomponentComponent } from './todocomponent.component';

describe('TodocomponentComponent', () => {
  let component: TodocomponentComponent;
  let fixture: ComponentFixture<TodocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodocomponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
