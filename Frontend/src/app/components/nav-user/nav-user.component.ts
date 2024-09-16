import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent {
  private modalService = inject(NgbModal);
  @Input()
  user: User | null = null;

  @Output('logout')
  logoutEvent = new EventEmitter<void>();

  logout() {
    this.logoutEvent.emit();
  }

  open(content: any) {
    this.modalService!.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
      (result: any) => {
        console.log(`Closed with: ${result}`);
      },
      (reason: any) => {
        console.log(`Dismissed with reason: ${reason}`);
      }
    );
  }

}
