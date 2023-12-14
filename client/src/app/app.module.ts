import {BrowserModule} from '@angular/platform-browser';
import {forwardRef, NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
// import {ResetComponent} from "./pages/reset/reset.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
// import { PostComponent } from './pages/post/post.component';
import { PostIndexComponent } from './pages/post/post-index/post-index.component';
import { PostShowComponent } from './pages/post/post-show/post-show.component';
import { PostUpdateComponent } from './pages/post/post-update/post-update.component';
import { PostDeleteComponent } from './pages/post/post-delete/post-delete.component';

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'posts', component: PostIndexComponent},
  // {path: 'reset', component: ResetComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordComponent,
    // ResetComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    forwardRef(() => HeaderComponent),
    forwardRef(() => FooterComponent),
    HeaderComponent,
    FooterComponent,
    // PostComponent,
    PostIndexComponent,
    PostShowComponent,
    PostUpdateComponent,
    PostDeleteComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
