import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosingoloComponent } from './todosingolo.component';

describe('TodosingoloComponent', () => {
  let component: TodosingoloComponent;
  let fixture: ComponentFixture<TodosingoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosingoloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosingoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
