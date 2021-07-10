import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingLstRoutingModule } from './shopping-list-routing.module';


@NgModule({
declarations: [ ShoppingListComponent,ShoppingEditComponent ],
imports:[
  FormsModule,ShoppingLstRoutingModule,RouterModule,SharedModule]
})
export class ShoppingListModule {}
