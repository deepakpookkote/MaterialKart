import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'top-menu-merchant',
  styles:[`
    .top-menu-merchant a{
      /*  color: green;*/
      color: white;
    }
    .nav a:hover{
     color: #8eb640;
    }
  `],
  template: `

 <top-menu-landing></top-menu-landing>
<div style="height:70px;"></div>

  `,
})
export class TopMenuMerchant extends AppComponent {
  public token = localStorage.getItem('GBCItoken');
    logout(){
      localStorage.removeItem('GBCItoken');
      this.token = '';
       this.redirect('page-landing',{});
    }

 }
