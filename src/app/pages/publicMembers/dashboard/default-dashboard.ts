import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';

import { globalService } from './../../../services/global.service';

declare var $:any; declare var Highcharts:any;

@Component({
  //selector: 'my-app',
  styles:[`
    .product-slider{
      -ms-overflow-style: none;  // IE 10+
        overflow: -moz-scrollbars-none;  // Firefox
        margin-right: -16px;
 
         overflow-x: hidden;
    }
    .product-slider browser {
     margin-right: -14px !important;

     overflow-x: hidden;
    }

    .product-slider::-webkit-scrollbar {
      display: none;
    }
    `],
  templateUrl: './app/pages/publicMembers/dashboard/default-dashboard.template.html' ,
})
export class DefaultPublicDashboardComponent extends AppComponent  {
  public products:any;
  public apiKey:any=localStorage.getItem('GBCItoken');

       constructor( public router: Router , public globalService: globalService){
          super(router,globalService);
        }
//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){
     this.scrollToRatings();

   }



 }
