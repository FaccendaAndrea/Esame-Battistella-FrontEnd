import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../entities/todo-entity';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user-entity';
import { Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-todocomponent',
  templateUrl: './todocomponent.component.html',
  styleUrls: ['./todocomponent.component.css']
})
export class TodocomponentComponent implements OnInit {
  todos: Todo[] = [];
  CambiaCompletato: boolean = false;

  @Input() users:User[]=[];

  currentUser: any;
  todoForm: FormGroup;

  private modalService = inject(NgbModal);
  private fb = inject(FormBuilder);

  constructor(private todoService: TodoService, private authService: AuthService, private userService: UserService) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required], 
      dueDate: [''], 
      assignedTo: [null] 
    });
  }

  ngOnInit(): void {
    this.GetTodos();
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
    this.userService.userList().subscribe(users=>{
      this.users=users;
    })
  }

  GetTodos(): void {
    this.todoService.Find(this.CambiaCompletato).subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ShowCompleted(event: any): void {
    this.CambiaCompletato = event.target.checked;
    this.GetTodos();
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
      const newTodo: Todo = {
        title: this.todoForm.value.title,
        dueDate: this.todoForm.value.dueDate || undefined, 
        assignedTo: this.todoForm.value.assignedTo,
        createdBy: this.currentUser,
        completed: false,
        expired: false
      };
      console.log(newTodo)
      
      this.todoService.add(newTodo).subscribe(
        (addedTodo: Todo) => {
          this.todos.push(addedTodo);  
          this.modalService.dismissAll();  
        },
        (error) => {
          console.log('Errore durante l\'aggiunta del to-do:', error);
        }
      );
    }
  }

}
