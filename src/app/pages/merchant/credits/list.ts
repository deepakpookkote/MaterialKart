import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';

@Component({
  styles:[`

    `],
  templateUrl: './app/pages/merchant/credits/list.template.html' ,
})
export class MerchantLeedCreditInfo extends AppComponent  {
  public products:any;
//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){

   }

 }
