import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { ErrorService } from '../../services/error.service';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-advanced',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-advanced.html',
  styleUrl: './contact-advanced.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactAdvanced implements OnInit {
  loadingService = inject(LoadingService);
  private errorService = inject(ErrorService);
  private fb = inject(FormBuilder);

  private serviceId = environment.emailjs.serviceId;
  private templateId = environment.emailjs.templateId;
  private publicKey = environment.emailjs.publicKey;
  
  submitted = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  email = signal('jsegundo.dev@gmail.com');
  
  // Statistics
  totalSubmissions = signal(0);
  lastSubmitTime = signal<Date | null>(null);
  
  // Form categories
  selectedCategory = signal('general');
  categories = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'job', label: 'Job Opportunity', icon: '💼' },
    { value: 'collaboration', label: 'Collaboration', icon: '🤝' },
    { value: 'feedback', label: 'Feedback', icon: '💭' }
  ];
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[+]?[\d\s()-]+$/)]],
    company: [''],
    category: ['general', Validators.required],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    urgent: [false],
    newsletter: [false]
  });
  
  get nameControl() { return this.contactForm.get('name')!; }
  get emailControl() { return this.contactForm.get('email')!; }
  get phoneControl() { return this.contactForm.get('phone')!; }
  get subjectControl() { return this.contactForm.get('subject')!; }
  get messageControl() { return this.contactForm.get('message')!; }
  
  ngOnInit() {
    // Load stats from localStorage
    const stats = localStorage.getItem('contactStats');
    if (stats) {
      const parsed = JSON.parse(stats);
      this.totalSubmissions.set(parsed.total || 0);
    }
  }
  
  async onSubmit() {
    this.submitted.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    
    if (this.contactForm.invalid) {
      this.errorMessage.set('Please fix the errors in the form.');
      return;
    }
    
    try {
      this.loadingService.show();
      
      const formData = this.contactForm.value;
      
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: formData.name,
          from_email: this.email,
          to_email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          category: this.getCategoryLabel(formData.category),
          subject: formData.subject,
          message: formData.message,
          urgent: formData.urgent ? 'YES - URGENT' : 'Normal',
          newsletter: formData.newsletter ? 'Subscribed' : 'Not subscribed'
        },
        this.publicKey
      );
      
      console.log('Email sent successfully:', response);
      
      // Update statistics
      const newTotal = this.totalSubmissions() + 1;
      this.totalSubmissions.set(newTotal);
      this.lastSubmitTime.set(new Date());
      
      localStorage.setItem('contactStats', JSON.stringify({
        total: newTotal,
        lastSubmit: new Date().toISOString()
      }));
      
      this.successMessage.set(
        `Thanks ${formData.name}! I've received your message and will respond within 24-48 hours.`
      );
      
      setTimeout(() => {
        this.contactForm.reset({ category: 'general' });
        this.submitted.set(false);
        this.successMessage.set('');
      }, 5000);
      
    } catch (error: unknown) {
      console.error('EmailJS Error:', error);
      this.errorMessage.set(this.errorService.getErrorMessage(error));
    } finally {
      this.loadingService.hide();
    }
  }
  
  getCategoryLabel(value: string): string {
    const category = this.categories.find(c => c.value === value);
    return category ? category.label : value;
  }
  
  clearForm() {
    this.contactForm.reset({ category: 'general' });
    this.submitted.set(false);
    this.errorMessage.set('');
  }
}