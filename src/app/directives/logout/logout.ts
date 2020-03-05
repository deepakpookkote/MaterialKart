import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
  import { RouterModule, Routes, Router } from '@angular/router';
  import { globalService } from './../../services/global.service';

declare var $:any;
@Component({
  //	selector: 'logout',
  	styles:[` `],
      template: ` 	`,
})
export class LogOutComponent extends AppComponent {
  constructor( public router: Router , public globalService: globalService){
     super(router,globalService);
   }
    ngOnInit(){
     this.redirect('page-landing',{});
    }
}
