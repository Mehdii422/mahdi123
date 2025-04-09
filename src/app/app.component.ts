import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { JobsComponent } from './jobs/jobs.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, JobsComponent],
  template: `
    <app-header></app-header>
    <main>
    <app-jobs></app-jobs>
    </main>
    <router-outlet />
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tadbiras';
}
