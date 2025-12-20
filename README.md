# My Portfolio - Angular 21 Learning Project

A modern portfolio application built with **Angular 21**, showcasing best practices including standalone components, signals, reactive forms, and API integrations.

## Features

- **Standalone Components** - No NgModules, components are self-contained
- **Angular Signals** - Modern reactive state management
- **Lazy Loading** - Routes load on-demand for better performance
- **Dark/Light Theme** - Theme toggle with localStorage persistence
- **API Integrations** - GitHub API, OpenWeatherMap, JSONPlaceholder
- **EmailJS Contact Form** - Send emails without a backend
- **Responsive Design** - Mobile-friendly layouts

## Project Structure

```
src/app/
├── components/           # Page and UI components
│   ├── about/           # About me page
│   ├── back-to-top/     # Scroll-to-top button
│   ├── blog/            # Blog posts (JSONPlaceholder demo)
│   ├── confirm-dialog/  # Reusable dialog (demonstrates input/output)
│   ├── contact/         # Basic contact form
│   ├── contact-advanced/# Advanced contact form with EmailJS
│   ├── github-profile/  # GitHub user profile display
│   ├── github-repos/    # GitHub repositories list
│   ├── header/          # Navigation with dropdowns
│   ├── loading-spinner/ # Global loading indicator
│   ├── not-found/       # 404 page
│   ├── projects/        # Portfolio projects showcase
│   ├── repo-detail/     # Individual repository details
│   ├── skills/          # Technical skills display
│   ├── star-rating/     # Reusable rating (demonstrates model())
│   └── weather/         # Weather widget
│
├── services/            # Business logic and API calls
│   ├── api.service.ts       # JSONPlaceholder REST API
│   ├── error.service.ts     # Centralized error handling
│   ├── github.service.ts    # GitHub API integration
│   ├── loading.service.ts   # Global loading state
│   ├── theme.service.ts     # Dark/light theme management
│   └── weather.service.ts   # OpenWeatherMap API
│
├── app.ts               # Root component
├── app.html             # Root template
├── app.routes.ts        # Route configuration with lazy loading
└── app.config.ts        # Application providers
```

## Key Angular Concepts Demonstrated

### Signals (State Management)
```typescript
// Simple signal
isLoading = signal(false);
this.isLoading.set(true);

// Computed signal (derived state)
stars = computed(() => Array.from({ length: this.maxStars() }));

// Effect (side effects when signals change)
effect(() => {
  localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
});
```

### Modern Component APIs
```typescript
// input() - one-way data binding (parent to child)
title = input<string>('Default');

// output() - event emission (child to parent)
confirmed = output<void>();

// model() - two-way binding (combines input + output)
rating = model<number>(0);
```

### Lazy Loading Routes
```typescript
{
  path: 'about',
  loadComponent: () =>
    import('./components/about/about').then((m) => m.About),
}
```

### Reactive Forms
```typescript
contactForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
});
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment files (see Environment Setup below)

4. Start the development server:
```bash
ng serve
```

5. Open http://localhost:4200

## Environment Setup

### Create Environment Files

Copy the template to create your environment files:

```bash
# Windows
copy src\environments\environment.template.ts src\environments\environment.ts
copy src\environments\environment.template.ts src\environments\environment.production.ts

# Mac/Linux
cp src/environments/environment.template.ts src/environments/environment.ts
cp src/environments/environment.template.ts src/environments/environment.production.ts
```

### Configure API Keys

Edit `environment.ts` with your credentials:

```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'your_service_id',      // From EmailJS dashboard
    templateId: 'your_template_id',    // From EmailJS templates
    publicKey: 'your_public_key'       // From EmailJS account
  },
  github: {
    token: ''  // Optional: for higher API rate limits
  },
  openWeather: {
    apiKey: 'your_api_key'  // From OpenWeatherMap
  }
};
```

### Where to Get API Keys

| Service | URL | Notes |
|---------|-----|-------|
| EmailJS | https://dashboard.emailjs.com | Free tier: 200 emails/month |
| GitHub Token | https://github.com/settings/tokens | Optional, increases rate limit |
| OpenWeatherMap | https://openweathermap.org/api | Free tier: 1,000 calls/day |

**Important:** Never commit real API keys. The `environment.ts` files are in `.gitignore`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `ng serve` | Start development server |
| `ng build` | Build for production |
| `ng test` | Run unit tests with Vitest |
| `ng lint` | Run ESLint |

## Component Examples

### Star Rating (Two-Way Binding with model())
```html
<!-- Parent component -->
<app-star-rating [(rating)]="project.rating" [maxStars]="5" />
```

### Confirm Dialog (One-Way with input/output)
```html
<app-confirm-dialog
  [title]="'Delete Project'"
  [message]="'Are you sure?'"
  [type]="'danger'"
  (confirmed)="onDelete()"
  (cancelled)="onCancel()" />
```

## API Rate Limits

| API | Without Auth | With Auth |
|-----|--------------|-----------|
| GitHub | 60 req/hour | 5,000 req/hour |
| OpenWeatherMap | 1,000 req/day | Varies by plan |
| JSONPlaceholder | Unlimited | N/A |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn More

- [Angular Documentation](https://angular.dev)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [GitHub REST API](https://docs.github.com/en/rest)
- [OpenWeatherMap API](https://openweathermap.org/api)

## License

MIT License - feel free to use this project for learning!
