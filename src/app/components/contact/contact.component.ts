import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  openLinkedIn(): void {
    window.open('https://www.linkedin.com/in/fcomunozm/', '_blank', 'noopener,noreferrer');
  }
}
