# MyPortfolio

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Environment Setup

## For New Developers

1. Copy the template file:
```bash
   cp environment.template.ts environment.ts
   cp environment.template.ts environment.production.ts
```

2. Edit `environment.ts` and `environment.production.ts` with your real API keys:
   - **EmailJS**: Get from https://dashboard.emailjs.com
   - **GitHub Token**: Get from https://github.com/settings/tokens (optional)
   - **OpenWeather**: Get from https://openweathermap.org/api

3. Never commit the real environment files - they're in .gitignore!

## API Key Sources

- **EmailJS**: Dashboard → Email Services (Service ID), Email Templates (Template ID), Account (Public Key)
- **GitHub**: Settings → Developer settings → Personal access tokens (optional, for higher rate limits)
- **OpenWeather**: Sign up → API keys section