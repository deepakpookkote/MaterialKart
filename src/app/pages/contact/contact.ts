import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../app.component';
declare var $:any;

@Component({
//  selector: ' ',
  styles:[`




    /* Header Section */
    .intro {
    /* display: table;
     width: 100%;
     padding: 0;
     background: url(./webroot/images/landing-page/GBCI-5.jpeg) no-repeat center center fixed;
     background-color: #e5e5e5;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     background-size: cover;
     -o-background-size: cover;
     filter:brightness(200%);*/
      display: table;
      width: 100%;
      padding: 0;
      background: url(./webroot/images/landing-page/GBCI-3.jpg);
      background-color: #e5e5e5;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      background-size: cover;
      -o-background-size: cover;
      background-position-x: 0;
      background-position-y: 81%;
      background-attachment: fixed;
    }
    .intro .overlay {
     background: rgba(0,0,0,0.4);
     /*height: 665px;*/
     height: 374px;
    }
    .intro h1 {

     color: #fff;
     font-size: 10em;
    /*	font-weight: 700;*/
     margin-top: 0;
     margin-bottom: 60px;
     font-weight: lighter;
    }
    .intro span {
     color: #a7c44c;
     font-weight: 600;
    }
    .intro p {
     color: #fff;
     font-size: 32px;
     font-weight: 300;
     margin-top: 10px;
     margin-bottom: 40px;
    }
    header .intro-text {
     padding-top: 250px;
     padding-bottom: 200px;
     text-align: center;
    }









    .contactField{
      border-bottom: 2px solid silver;
    }
    .contactField:focus{
      border-bottom: 2px solid #4285f4;
    }
  /*  .contactField{
      width: 100%;
      background: #eee;
      color: #999;
      font-size: 16px;
      transition: background-color 0.3s ease 0s;
      padding: 7px 18px;
      height: 50px;
      -webkit-box-shadow: none;
      box-shadow: none;
      border-radius: 0;
      border: none;
  }
  .form-control:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 1px solid black;
  } */
  .contactLabel{
      font-size: 1.3em;
      font-weight: 300;
      color: #333;
  }
  .form-group{
      margin-bottom: 25px;
  }
  .sidebar-right{
      background: #f6f7f9;
      padding: 20px;
      margin-top: 135px;
  }
  .sidebar-right h5{
      color: #878a8e;
  }
  .sidebar-right p{
      font-size: 0.99em;
      color: #878a8e;
      font-weight: inherit;
  }
  .mr5{
      margin-right: 5px;
  }


.md-form{
  padding: 2px;
  margin-bottom:0px;
  margin-top:2px;
}
.padding5{
  padding: 5px;
}
.padding10{
  padding: 10px;
}

  `],
//  template: `  `,
templateUrl: './app/pages/contact/contact.template.html'
})
export class ContactComponent  extends AppComponent  {
  name = 'Angular';

  ngOnInit(){
    this.scrollToRatings();
  }
 }
