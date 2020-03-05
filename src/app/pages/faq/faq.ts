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
     background: url(./webroot/images/landing-page/GBCI-5.jpeg);
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






        /* Styles for Accordion */
        .toggle:last-child {
          border-bottom: 1px solid #dddddd;
        }
        .toggle .toggle-title {
          cursor: pointer;
          position: relative;
          display: block;
          border-top: 1px solid #dddddd;
          margin-bottom: 6px;
        }
        .toggle .toggle-title h3 {
          font-size: 18px;
          margin: 0px;
          line-height: 1;
          cursor: pointer;
        /*  font-weight: 200; */
         font-weight:400;
        }
        .toggle .toggle-inner {
          padding: 7px 25px 10px 25px;
          display: none;
          margin: -7px 0 6px;
        }
        .toggle .toggle-inner div {
          max-width: 100%;
        }
        .toggle .toggle-title .title-name {
          display: block;
          padding: 25px 25px 14px;
        }
        .toggle .toggle-title a i {
          font-size: 22px;
          margin-right: 5px;
        }
        .toggle .toggle-title i {
          position: absolute;
          background: url("http://arielbeninca.com/Storage/plus_minus.png") 0px -24px no-repeat;
          width: 24px;
          height: 24px;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
          margin: 22px;
          right: -30px;
        }
        .toggle .toggle-title.active i {
          background: url("http://arielbeninca.com/Storage/plus_minus.png") 0px 0px no-repeat;
        }




  `],
//  template: `  `,
templateUrl: './app/pages/faq/faq.template.html'
})
export class FaqComponent  extends AppComponent  {
   name = 'Angular';

   ngOnInit(){
     this.scrollToRatings();
    // this.jqinit();
     this.getFAQ();
   }

   jqinit(){
     if( $(".toggle .toggle-title").hasClass('active') ){
		$(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
	}else{
    	$(".toggle .toggle-title").closest('.toggle').find('.toggle-inner').hide();
  }
	$(".toggle .toggle-title").click(function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
		}
		else{	$(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
		}
	});

 this.jqcss();

   }

   jqcss(){



       $('toggle:last-child').css({
         'border-bottom': '1px solid #dddddd'
       });
       $('.toggle .toggle-title').css({
         'cursor': 'pointer',
         'position': 'relative',
         'display': 'block',
         'border-top': '1px solid #dddddd',
         'margin-bottom': '6px'
       });



       $('.toggle .toggle-title h3').css( {
         'font-size': '18px',
         'margin': '0px',
         'line-height': '1',
         'cursor': 'pointer',
       /*  font-weight: 200; */
        'font-weight':'400'
      });

      $('.toggle .toggle-inner').css( {
        'padding': '7px 25px 10px 25px',
        'display': 'none',
        'margin': '-7px 0 6px'
      });
      $('.toggle .toggle-inner div').css( {
        'max-width': '100%'
      });
      $('.toggle .toggle-title .title-name').css( {
        'display': 'block',
        'padding': '25px 25px 14px'
      });
      $('.toggle .toggle-title a i').css( {
        'font-size': '22px',
        'margin-right': '5px'
      });



       $('.toggle .toggle-title .ispan').css({
         'position': 'absolute',
         'background': 'url("http://arielbeninca.com/Storage/plus_minus.png") 0px -24px no-repeat',
         'width': '24px',
         'height': '24px',
         '-webkit-transition': 'all 0.3s ease',
         'transition': 'all 0.3s ease',
         'margin': '22px',
         'right': '-30px'
       });
         $('.toggle .toggle-title.active .ispan').css( {
         'background': 'url("http://arielbeninca.com/Storage/plus_minus.png") 0px 0px no-repeat'
       });




   }

   getFAQ(){
     let parent:any=this;
     $.post(this.ApiURL+'pages/public_page_view',{
         'data':{
           'filter':{
             'slug':'faq'
           }
         }
         },function(res:any){
           console.log(res.pages[0]['content']);
           parent.pageContent = res.pages[0]['content'];
        //  document.getElementById("cnt").innerHTML=parent.pageContent;
           //this.productsInfo = [1];
     parent.jqinit();
         });
   }

 }
