import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.servie';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

constructor(private dataStorageService: DataStorageService,
            private authServie: AuthService) {}

ngOnInit(){
  this.userSub = this.authServie.user.subscribe(user => {
  // this.isAuthenticated = !user ? false : true
  // shorthand format
  this.isAuthenticated = !!user ;
  console.log(!user);
  console.log(!!user);
  }
  );
}
onSaveData() {
 this.dataStorageService.storeRecipes();
}

onFetchData() {
  this.dataStorageService.fetchRecipes().subscribe();
}

onLogout() {
  this.authServie.logout();
}
ngOnDestroy() {
this.userSub.unsubscribe();
}
}
