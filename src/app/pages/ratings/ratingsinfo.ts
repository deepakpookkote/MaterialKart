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
     display: table;
     width: 100%;
     padding: 0;
     background: url(./webroot/images/about/pexels-photo-348323.jpeg) no-repeat center center fixed;
     background-color: #e5e5e5;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     background-size: cover;
     -o-background-size: cover;
     /*filter:brightness(200%);*/
    }
    .intro .overlay {
     background: rgba(0,0,0,0.4);
     /*height: 665px;*/
     height: 300px;
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







  `],
//  template: `  `,
templateUrl: './app/pages/ratings/ratingsinfo.template.html'
})
export class RatingsInfoComponent  extends AppComponent  {
   pageContent = '';

   ngOnInit(){
     this.scrollToRatings();
     this.getAbout();
    //  console.log('GGGGGG');
   }

   getAbout(){

     let parent:any=this;
     $.post(this.ApiURL+'pages/public_page_view',{
    	    'data':{
            'filter':{
              'slug':'ratings-leed'
            }
    	    }
    	    },function(res:any){
            //console.log(res.pages[0]['content']);
    	    	parent.pageContent = res.pages[0]['content'];
    	    	//this.productsInfo = [1];
    	    });
   }

 }
