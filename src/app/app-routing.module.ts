import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerciComponent } from './merci/merci.component';
import { PageNoteComponent } from './page-note/page-note.component';

const routes: Routes = [
  { path: 'token/:token', component: PageNoteComponent },
  { path: 'merci', component: MerciComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
