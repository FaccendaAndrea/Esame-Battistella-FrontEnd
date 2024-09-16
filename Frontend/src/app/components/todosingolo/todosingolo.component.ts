import { Component, Input } from '@angular/core';
import { Todo } from '../../entities/todo-entity';
import { TodoService } from '../../services/todo.service';
import { FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { User } from '../../entities/user-entity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todosingolo',
  templateUrl: './todosingolo.component.html',
  styleUrls: ['./todosingolo.component.css'] // Nota: corretto da `styleUrl` a `styleUrls`
})
export class TodosingoloComponent {
  @Input()
  todo!: Todo;

  todos: Todo[] = [];

  @Input() users: User[] = [];

  todoForm: FormGroup;

  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  constructor(private p: TodoService, private userService: UserService) {
    this.todoForm = this.fb.group({
      assignedTo: [null]
    });
  }

  ngOnInit(): void {
    this.userService.userList().subscribe(users => {
      this.users = users;
    });
  }

  ChangeCompleted(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }

    if (this.todo.completed) {
      this.markUnCompleted();
    } else {
      this.markCompleted();
    }
  }

  private markCompleted(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.p.check(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = true;
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }

  private markUnCompleted(): void {
    if (!this.todo || !this.todo.id) {
      console.error('Todo ID not defined');
      return;
    }
    this.p.uncheck(this.todo.id).subscribe(
      (updatedTodo: Todo) => {
        this.todo.completed = false;
      },
      (error) => {
        console.error('Error during the operation:', error);
      }
    );
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed with reason: ${reason}`);
      }
    );
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const assignedTo = this.todoForm.value.assignedTo;
      const todoId = this.todo.id; 
      console.log(assignedTo);
      console.log("ID: "+todoId);

      if (todoId) {
        this.p.assign(todoId, assignedTo).subscribe(
          (response: any) => {
            console.log('Todo assigned successfully', response);
          },
          (error) => {
            console.error('Error assigning todo', error);
          }
        );
      } else {
        console.error('Todo ID is missing');
      }
    } else {
      console.error('Form is invalid');
    }
    window.location.reload();
    this.modalService.dismissAll();
  }
}
