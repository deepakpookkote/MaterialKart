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
  //selector: 'my-app',
  styles:[`

    body{
    background-color:green;
    }

        /* Header Section */
        .intro {
        /* display: table;
         width: 100%;
         padding: 0;
         background: url(./webroot/images/about/pexels-photo-348323.jpeg) no-repeat center center fixed;
         background-color: #e5e5e5;
         -webkit-background-size: cover;
         -moz-background-size: cover;
         background-size: cover;
         -o-background-size: cover;
         filter:brightness(200%);*/
         display: table;
         width: 100%;
         padding: 0;
         background: url(./webroot/images/landing-page/GBCI-2.jpg);
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


.container-fluid{
  background-image:url(./webroot/images/stock-images/merchant-register-bg.jpeg);
  background-size: 110%; background-repeat:no-repeat;

}
  .panel-leed-cover{
    background-image:url(./webroot/images/ratings-images/leed.jpg);
  }
  .panel-sites-cover{
    background-image:url(./webroot/images/ratings-images/sites-swaner.jpg);
  }
  .panel-peer-cover{
    background-image:url(./webroot/images/ratings-images/peer-powerlines.jpg);
  }
  .panel-well-cover{
    background-image:url(./webroot/images/ratings-images/well-hallway.jpg);
  }
  .panel-edge-cover{
    background-image:url(./webroot/images/ratings-images/edge-buildings.jpg);
  }
  .panel-gresb-cover{
    background-image:url(./webroot/images/ratings-images/gresb-buildings.jpg);
  }
  .panel-parksmart-cover{
    background-image:url(./webroot/images/ratings-images/parksmart.jpg);
  }
  .panel-zero-waste-cover{
    background-image:url(./webroot/images/ratings-images/zero-waste.jpg);
  }
  @media only screen and (max-width: 768px) {
    .ratings-list {
      height: 600px !important;
    }
  }
  @media only screen and (max-width: 768px) {
    .copy.three-quart.left.image-right.v-center-wrapper, .copy.three-quart.right.v-center-wrapper {
      display: block;
    }
  }
  .image{
    height:100%;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
  }
  .inner{
    height: 100%;
   /* background: #4a5d6c;
    color: white;*/
    padding: 3%;
    line-height: 3;
    letter-spacing: 1px;
  }
  .inner hr{
    width: 40%;
    border-color: #4a5d6c;
  }

  .inner p{ line-height:25px; text-align: justify;  }


    `],
  templateUrl: './app/pages/ratings/ratings-home.template.html' ,
})
export class RatingsHomeComponent extends AppComponent  {
  public products:any;






   ngOnInit(){
 this.scrollToRatings();
   }





 }
