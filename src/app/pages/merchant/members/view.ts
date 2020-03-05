import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';

@Component({
  styles:[`

    `],
  templateUrl: './app/pages/merchant/members/view.template.html' ,
})
export class MerchantMemberView extends AppComponent  {
  public members:any;
//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){

   }

 }
