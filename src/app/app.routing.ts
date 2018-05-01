import { ModuleWithProviders} from '@angular/core';
import {Routes , RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AddNewBookComponent} from './components/add-new-book/add-new-book.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {ViewBookComponent} from './components/view-book/view-book.component';
import {EditBookComponent} from './components/edit-book/edit-book.component';

const appRoutes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'add-new-book',
        component: AddNewBookComponent
    },
    {
        path: 'book-list',
        component: BookListComponent
    },
    {
        path: 'view-book/:id',
        component: ViewBookComponent
    },
    {
        path: 'edit-book/:id',
        component: EditBookComponent
    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);