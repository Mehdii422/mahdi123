import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { JobsComponent } from './jobs/jobs.component';
import { FilteredJobsComponent } from './filtered-jobs/filtered-jobs.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', component: JobsComponent },
  { path: 'categories/:domain', component: FilteredJobsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-account', component: ManageAccountComponent },
  { path: 'chat/:chatId', component: ChatComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }