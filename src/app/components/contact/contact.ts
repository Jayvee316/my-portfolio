import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  loadingService = inject(LoadingService);
  private fb = inject(FormBuilder);
  
  // Form submission state
  submitted = signal(false);
  successMessage = signal('');
  
  // Contact info
  email = signal('your.email@example.com');
  github = signal('https://github.com/yourusername');
  linkedin = signal('https://linkedin.com/in/yourprofile');
  
  // Create reactive form with validation
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });
  
  // Get form controls for easy access in template
  get nameControl() { return this.contactForm.get('name')!; }
  get emailControl() { return this.contactForm.get('email')!; }
  get subjectControl() { return this.contactForm.get('subject')!; }
  get messageControl() { return this.contactForm.get('message')!; }
  
  // Handle form submission
  async onSubmit() {
    this.submitted.set(true);
    
    // Check if form is valid
    if (this.contactForm.invalid) {
      return;
    }
    
    // Simulate sending email (in real app, call API here)
    await this.loadingService.simulateLoading(2000);
    
    const formData = this.contactForm.value;
    console.log('Form submitted:', formData);
    
    // Show success message
    this.successMessage.set(`Thanks ${formData.name}! I'll get back to you soon.`);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.contactForm.reset();
      this.submitted.set(false);
      this.successMessage.set('');
    }, 3000);
  }
}