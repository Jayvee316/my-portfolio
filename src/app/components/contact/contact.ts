import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  loadingService = inject(LoadingService);
  private fb = inject(FormBuilder);
  
  private serviceId = environment.emailjs.serviceId;
  private templateId = environment.emailjs.templateId;
  private publicKey = environment.emailjs.publicKey;
  
  submitted = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  
  email = signal('jsegundo.dev@gmail.com');
  github = signal('https://github.com/yourusername');
  linkedin = signal('https://linkedin.com/in/yourprofile');
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });
  
  get nameControl() { return this.contactForm.get('name')!; }
  get emailControl() { return this.contactForm.get('email')!; }
  get subjectControl() { return this.contactForm.get('subject')!; }
  get messageControl() { return this.contactForm.get('message')!; }
  
  async onSubmit() {
    this.submitted.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    
    if (this.contactForm.invalid) {
      return;
    }
    
    try {
      this.loadingService.show();
      
      // Send email via EmailJS
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
          to_email: this.contactForm.value.email
        },
        this.publicKey
      );
      
      console.log('Email sent successfully:', response);
      
      this.successMessage.set(
        `Thanks ${this.contactForm.value.name}! Your message has been sent successfully.`
      );
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted.set(false);
        this.successMessage.set('');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      this.errorMessage.set('Failed to send message. Please try again or email me directly.');
    } finally {
      this.loadingService.hide();
    }
  }
}