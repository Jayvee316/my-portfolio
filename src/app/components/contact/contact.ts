import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  email = signal('your.email@example.com');
  github = signal('https://github.com/yourusername');
  linkedin = signal('https://linkedin.com/in/yourprofile');
}