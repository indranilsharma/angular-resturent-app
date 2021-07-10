import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  // for directive access
  @ViewChild( PlaceholderDirective, { static: false } ) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  onSwitchMode() {
   this.isLoginMode = !this.isLoginMode;
 }

  onSubmit(form: NgForm) {
    // gives the extra validations
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    // console.log(form.value);

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login( email, password );
    } else {
       authObs = this.authService.signup(email, password);
  }
    authObs.subscribe(
    (resData) => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
     } , (errorMessage) => {
       console.log(errorMessage);
       this.error = errorMessage;
       // call for programatically call
       this.showErrorAlert(errorMessage);
       this.isLoading = false;
     }
  );

    form.reset();
  }
  onHandelError() {
    this.error = null;
  }

  // manulay call alert component
  private showErrorAlert(message: string) {
    // const alert = new AlertComponent();
    const alerCmpFactory = this.componentFactoryResolver
    .resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewcontainerRef;
    hostViewContainerRef.clear();

   const componentRef = hostViewContainerRef.createComponent(alerCmpFactory);
   componentRef.instance.message = message;
   this.closeSub = componentRef.instance.close.subscribe(() => {
     this.closeSub.unsubscribe();
     // to clear all render
     hostViewContainerRef.clear();
   })
  }
  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
