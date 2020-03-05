
import { Component,style, state, animate, transition, trigger,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    ViewChild,HostListener
} from '@angular/core';

import { NgZone } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../app.component';

import { globalService } from './../../services/global.service';

declare var $:any;

import {enableProdMode} from '@angular/core';

enableProdMode();

@Component({
  //selector: 'my-app',
  styles:[`

     h2 {
     	margin: 0 0 20px 0;
     	font-weight: 500;
     	font-size: 34px;
     	color: #333;
     	text-transform: uppercase;
     }
     h3 {
     	font-size: 22px;
     	font-weight: 500;
     	color: #333;
     }
     h4 {

     	font-weight: 700;

     }
     h5 {
     	text-transform: uppercase;
     	font-weight: 700;
     	line-height: 20px;
     }
     p {
     	font-size: 16px;
     }
     p.intro {
     	margin: 12px 0 0;
     	line-height: 24px;
     }
     a {
     	color: #8eb640;
     }
     a:hover, a:focus {
     	text-decoration: none;
     	color: #222;
     }
     ul, ol {
     	list-style: none;
     }
     .clearfix:after {
     	visibility: hidden;
     	display: block;
     	font-size: 0;
     	content: " ";
     	clear: both;
     	height: 0;
     }
     .clearfix {
     	display: inline-block;
     }
     * html .clearfix {
     	height: 1%;
     }
     .clearfix {
     	display: block;
     }
     ul, ol {
     	padding: 0;
     	webkit-padding: 0;
     	moz-padding: 0;
     }
     hr {
     	height: 2px;
     	width: 40%;
     	text-align: center;
     	/*position: relative;*/
     	background: #8eb640;
     	/*margin: 0;*/
     	margin-bottom: 40px;
     	border: 0;
     	/*margin-left: 39%;*/
     	left: 50%
     }
     .btn:active, .btn.active {
     	background-image: none;
     	outline: 0;
     	-webkit-box-shadow: none;
     	box-shadow: none;
     }
     a:focus, .btn:focus, .btn:active:focus, .btn.active:focus, .btn.focus, .btn:active.focus, .btn.active.focus {
     	outline: none;
     	outline-offset: none;
     }
     /* Header Section */
     .intro {
     	display: table;
     	width: 100%;
     	padding: 0;
     	background: url(./webroot/images/landing-page/jesse-orrico-60368.jpg) no-repeat center center fixed;
     	background-color: #e5e5e5;
     	-webkit-background-size: cover;
     	-moz-background-size: cover;
     	background-size: cover;
     	-o-background-size: cover;
     	/*filter:brightness(200%);*/
     }
     .intro .overlay {
     	background: rgba(0,0,0,0.4);
     	height: 665px;
     }
     .intro h1 {
     	/*font-family: 'Dancing Script', cursive;*/
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
     /* About Section */
     #about {
     	padding: 120px 0;
     }
     #about h3 {
     	font-size: 20px;
     }
     #about .about-text {
     	margin-left: 10px;
     }
     #about .about-img {
     	display: inline-block;
     	position: relative;
     }
     #about .about-img:before {
     	display: block;
     	content: '';
     	position: absolute;
     	top: 8px;
     	right: 8px;
     	bottom: 8px;
     	left: 8px;
     	border: 1px solid rgba(255, 255, 255, 0.5);
     }
     #about p {
     	line-height: 24px;
     	margin: 15px 0 30px;
     }
     /* Menu Section */
     #ratings-info {
     	padding: 0 0 60px 0;
     }
     /*#ratings-info .section-title {
     	background: #444 url(../img/menu-bg.jpg) center center no-repeat fixed;
     	background-size: cover;
     }*/
     #ratings-info .section-title h2 {
     	color: #fff;
     }
     #ratings-info img {
     	width: 300px;
     	box-shadow: 15px 0 #a7c44c;
     }
     #ratings-info h3 {
     	padding: 10px 0;
     	text-transform: uppercase;
     }
     #ratings-info .menu-section hr {
     	margin: 0 auto;
     }
     #ratings-info .menu-section {
     	margin: 0 20px 80px;
     }
     #ratings-info .menu-section-title {
     	font-size: 26px;
     	display: block;
     	font-weight: 500;
     	color: #444;
     	margin: 20px 0;
     	text-align: center;
     }
     #ratings-info .menu-item {
     	margin: 35px 0;
     	font-size: 18px;
     }
     #ratings-info .menu-item-name {
     	font-weight: 600;
     	font-size: 17px;
     	color: #555;
     	border-bottom: 2px dotted rgb(213, 213, 213);
     }
     #ratings-info .menu-item-description {
     	font-style: italic;
     	font-size: 15px;
     }
     #ratings-info .menu-item-price {
     	float: right;
     	font-weight: 600;
     	color: #555;
     	margin-top: -26px;
     }
     /* Footer Section*/
     #footer {
     	background: #262626;
     	padding: 50px 0 0 0;
     }
     #footer h3 {
     	color: #8eb640;
     	font-weight: 400;
     	font-size: 18px;
     	text-transform: uppercase;
     	margin-bottom: 20px;
     }
     #footer .copyrights {
     	padding: 20px 0;
     	margin-top: 50px;
     	/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#779936+0,8eb640+50 */
     	background: rgb(119,153,54); /* Old browsers */
     	background: -moz-linear-gradient(top, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* FF3.6-15 */
     	background: -webkit-linear-gradient(top, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* Chrome10-25,Safari5.1-6 */
     	background: linear-gradient(to bottom, rgba(119,153,54,1) 0%, rgba(142,182,64,1) 50%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#779936', endColorstr='#8eb640', GradientType=0 ); /* IE6-9 */
     }
     #footer .social {
     	margin: 20px 0 30px 0;
     }
     #footer .social ul li {
     	display: inline-block;
     	margin: 0 20px;
     }
     #footer .social i.fa {
     	font-size: 26px;
     	padding: 4px;
     	color: #fff;
     	transition: all 0.3s;
     }
     #footer .social i.fa:hover {
     	color: #eee;
     }
     #footer p {
     	font-size: 15px;
     	color: rgba(255,255,255,0.8)
     }
     #footer a {
     	color: #f6f6f6;
     }
     #footer a:hover {
     	color: #333;
     }
     .panel .image {
       position: relative;
       height: 100%;
       background-color: transparent;
       background-repeat: no-repeat;
       background-position: center top;
       background-size: cover;
     }

     #ratings-info .panel{
     	margin-bottom: -2px;
     }
     .panel-leed-cover{
     	background: url(./webroot/images/landing-page/leed.jpg);
     }
     .panel-sites-cover{
     	background: url(./webroot/images/landing-page/sites-swaner.jpg);
     }
     .panel-peer-cover{
     	background: url(./webroot/images/landing-page/peer-powerlines.jpg);
     }
     .panel-well-cover{
     	background: url(./webroot/images/landing-page/well-hallway.jpg);
     }
     .panel-edge-cover{
     	background: url(./webroot/images/landing-page/edge-buildings.jpg);
     }
     .text{
     	line-height: 2;
     	top: 12%;
     }
     /*Articles section*/

     .border {
         /*border-top: 1px solid #999;
         border-bottom: 1px solid #999;
         margin: 0 45%;
         -webkit-transition: all 0.3s;
         -moz-transition: all 0.3s;
         -o-transition: all 0.3s;
         transition: all 0.3s;*/
         border-top: 1px solid #2196F3;
         border-bottom: 1px solid #2196F3;
         margin: 8% 45% 7% 0;
         -webkit-transition: all 0.3s;
         -moz-transition: all 0.3s;
         -o-transition: all 0.3s;
         transition: all 0.3s;
         width: 10%
     }

     .newsFeed-section-1 {
         padding-top: 10px;
         padding-bottom: 120px;
         background-color: #f1f1f1;
     }

     .about-us-section-2 {
         padding-top: 120px;
         padding-bottom: 120px;
         background-color: #28ABE3;
     }
     .welcome-section {
          background-color: #fff;
         box-shadow: 0 0 3px #ccc;
         padding: 30px;
         cursor: pointer;
         height: 400px;
     }

     .welcome-section img {
         width: 100%;
         -webkit-border-radius: 2px;
         -moz-border-radius: 2px;
         -o-border-radius: 2px;
         border-radius: 2px;
     }


     .welcome-section h3 {
        /* padding-top: 20px;*/
         color: #777;
         text-align: left;
         /*text-transform: uppercase;*/
         font-size: 18px;
         font-weight: 500;
         line-height: 1.3;
     }

     .welcome-section p {
         padding-top: 20px;
         color: #999;
     }

     /*.welcome-section:hover .border {
         margin: 0 40%;
     }*/
     div.panel{
          box-shadow: none !important;
     }

     .articleDescription{
          height: 100px;
     }


.product-slider{
  -ms-overflow-style: none;  // IE 10+
    overflow: -moz-scrollbars-none;  // Firefox
    overflow-x: hidden;
}
.product-slider::-webkit-scrollbar {
  display: none;
}

.product-slider-nav{

  background: #eee;
border: #ddd 1px solid;
width: 50px;
font-size: 20px;
position: relative; /*top: -305px;*/
top: -245px;

}
.product-slider-nav ul li{
  display: block;
text-align: center;
padding: 20px 0;
border-top: 1px solid #d4d4d4;

color: #444;
cursor:pointer;
/*
-webkit-transition: background 2s ease-in-out, color 2s ease-in-out;
-moz-transition: background 2s ease-in-out, color 2s ease-in-out;
transition: background 2s ease-in-out, color 2s ease-in-out;
*/

-webkit-transition: background 1s, color 2s;
  -moz-transition: background 1s, color 2s;
  transition: background 1s, color 2s;

}

.product-slider-nav ul li:hover {


background: #676666/*#272828*/;
color: white;



}

.banner-search-area{

}
.banner-search-area h1{
  color: white; font-size:40px;text-shadow: 2px 3px 5px black;
}
.banner-search-area .search-container{
border-radius:3px; margin-left: 30%; margin-right: 30%; background: white;
}
.banner-search-area .text-box{
  height: 48px; border-radius:3px;
  padding-right: 80px;
}
.banner-search-area .btn{
  background:#009aee; padding:10px; font-size:19px; position: relative; top: -70.4px; left: 6px;
    box-shadow: none;
    border-radius:0px;
}
.banner-search-area .clearx{
  position: relative; top: -50.4px; left: 6px;
  color: silver; cursor: pointer;
}
.banner-search-area .clearx:hover{
  color: grey;
}

.banner-search-area .btn:hover{
  box-shadow: none;
}

.banner-search-area .hint-container{
     position: relative; top: 20px;
}

.banner-search-area .hint-container .group{
   position: relative; top: -10px;
   height: 120px; overflow: auto;
}
.banner-search-area .hint-container .group div{
  padding: 1px 10px 1px 10px; cursor: pointer;
}
.banner-search-area .hint-container .group div:hover{
 background: #dfdfdf;
}

.banner-search-area .hint-container span{
  color: grey; font-size: 14px; font-weight: normal
}


.scrollToTop{
  display: none;
  width: 45px;
  height: 45px;
  text-indent: -9999px;
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
  background: #708A96 url("./webroot/images/up-arrow.png") no-repeat center 43%; */
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}
.scrollToTop:hover{
  background-color: #45526E;
}









.modal-window {
  position: fixed;
  /*background-color: rgba(255, 255, 255, 0.15);*/
  background-color: rgba(0, 0, 0, 0.15);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  opacity: 1;
  pointer-events: auto;

}

.modal-window>div {
  width: 60%;
  position: relative;
  margin: 10% auto;

  background: #f6f6f6;
  color: #444;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

}
.modal-window .modal-area{
  padding: 10px;
  margin-top: -10px;
}



.modal-close {
  color: #464646;
  line-height: 50px;
  font-size: 95%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
}

.modal-close:hover {
  color: #000;
}

.modal-window h4 {
  padding: 10px;
  margin: 0 0 15px;
  background-color: #ffffff;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
}
    `],
  templateUrl: './app/pages/home/listing.template.html' ,
})
export class ListingComponent extends AppComponent  {
    public apiKey:any=localStorage.getItem('GBCItoken');
  public products:any=[];
  public forrange:any=[];
  public scrollPos:number=0;
  public hintContainer:any=false;
  public searchObject:any="";
  public hintProducts:any=[];  public orginalHintProducts:any=[];
  public getApiUrl:any=this.ApiURL;
  public accountType:any=localStorage.getItem('GBCIaccountType');
  public wishListWindow:any=false;
   public wishListmanage:any=false;
   public wishItem:any;
   public wishlistSuccessMsg:any="";
   public wishListCategObj:string="";

   public productCategories:any= ['Adhesive','Ceiling','Concrete','EVSE','Exterior',
'Flooring','Faucet','Green Vehicles','Glazing External','Insulation','Indoor Furniture','Internal Paint','Pavers',
'Roof Paint','Laminate','WC'];







   public categoryFilterItem:any=[];

   public wishlistCategory:any=[];

   public searchHintLocked:any=[];

   public JumpCnt:number=0;
    public Product4Compare:any="";
    public Product4ComparePID:any=[];
    private creditsFilterItem:any=[]; private ratingsFiterItem:any=[];

   constructor( public router: Router , public globalService: globalService,lc: NgZone){
      super(router,globalService);
      window.onscroll = () => {

          let windowHeight = "innerHeight" in window ? window.innerHeight
              : document.documentElement.offsetHeight;
          let body = document.body, html = document.documentElement;
          let docHeight = Math.max(body.scrollHeight,
              body.offsetHeight, html.clientHeight,
              html.scrollHeight, html.offsetHeight);
          let windowBottom = windowHeight + window.pageYOffset;
          if (windowBottom >= docHeight) {

            this.LoadMore();
          }

       };




    }



  ngOnInit(){

    this.searchObject=this.globalService.getData().productSearch;
     this.getPublicProducts();
    this.scrollToRatings();

    // this.categoryFilterItem=this.globalService.getData().categoryFilterItem;
    // if(this.categoryFilterItem==undefined){ this.categoryFilterItem=[]; }
    //
    // this.creditsFilterItem=this.globalService.getData().creditsFilterItem;
    // if(this.creditsFilterItem==undefined){ this.creditsFilterItem=[]; }
    //
    // this.ratingsFiterItem=this.globalService.getData().ratingsFiterItem;
    // if(this.ratingsFiterItem==undefined){ this.ratingsFiterItem=[]; }

    this.productCompareCategory=this.globalService.getData().ComparProductCat;
  //  console.log('this.productCompareCategory',this.productCompareCategory);



    $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });

for(let i=0;i<=20;i++){
this.forrange.push('aa');
}

localStorage.removeItem('activeProductId');



  this. getWishlistCategory();
  }

  checkTickBoxCategory(item:any){
    let pos=(this.categoryFilterItem).indexOf(item);

     if( pos>=0){
       return 1;
     }else{
       return 0;
     }
  }

  checkTickBoxCredits(item:any){
    let pos=(this.creditsFilterItem).indexOf(item);

     if( pos>=0){
       return 1;
     }else{
       return 0;
     }
  }

  checkTickBoxRatings(item:any){
    let pos=(this.ratingsFiterItem).indexOf(item);

     if( pos>=0){
       return 1;
     }else{
       return 0;
     }
  }

  combineFilterCategories(item:any){
    let pos=(this.categoryFilterItem).indexOf(item);
     if( pos>=0){
       delete this.categoryFilterItem[pos];
       this.categoryFilterItem.splice(pos, 1); //alert(pos);
     }else{
      (this.categoryFilterItem).push(item);
     }

     this.globalService.setData({
       'categoryFilterItem':this.categoryFilterItem
     });

this.getPublicProducts();
    // console.log('filtercategory',this.categoryFilterItem);
    //categoryFilterItem
  }

  combineFilterCredits(item:any){
    let pos=(this.creditsFilterItem).indexOf(item);
     if( pos>=0){
       delete this.creditsFilterItem[pos];
     }else{
      (this.creditsFilterItem).push(item);
     }

     this.globalService.setData({
    //   'creditsFilterItem':this.creditsFilterItem
     });

  this.getPublicProducts();
    // console.log('filtercategory',this.categoryFilterItem);
    //categoryFilterItem
  }
  combineFilterRatings(item:any){
    let pos=(this.ratingsFiterItem).indexOf(item);
     if( pos>=0){
       delete this.ratingsFiterItem[pos];
     }else{
      (this.ratingsFiterItem).push(item);
     }

     this.globalService.setData({
      // 'ratingsFiterItem':this.ratingsFiterItem
     });

  this.getPublicProducts();
    // console.log('filtercategory',this.categoryFilterItem);
    //categoryFilterItem
  }




  hintFilter(val:any){
    let parent=this;
    parent.hintProducts=[];
    parent.searchHintLocked=[];
    //this.globalService.setData({});
    this.globalService.setData({
      'productId':'',
      'productSearch':''
    });

    if(this.searchObject.length>1){
      this.hintContainer=true;

      $.post(this.ApiURL+'products/public_product_view',{
           'data':{
                'filter':{
                'name-category': val, /* similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory */
                },
                'extra':{
                   'pageJump':0,  /* pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined */
                   //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                   'required':['name','category']
                }
           }
  },function(res:any){
   parent.hintProducts=res.products;
   parent.orginalHintProducts=res.products;
  });



    }else{
       this.hintContainer=false;
    }

  }

  hintDisplayLogic(name:any,category:any){


    var lengthSrch=(this.searchObject).length;
    let categ=category.substr(0,lengthSrch);
    let nam=name.substr(0,lengthSrch);
    nam=nam.toLowerCase();

//console.log(nam,'--',this.searchObject);
        if(nam==this.searchObject){

             this.checkk(this.orginalHintProducts);

        //  return name;
        }else{
          if( (this.searchHintLocked).indexOf(categ) < 0 ){
            (this.hintProducts).unshift({name:category,productId:'',category:category});
            (this.searchHintLocked).push(categ);
            this.checkk(this.hintProducts);
          //  return category;
          }else{
            //return name;
          }
        }
//console.log('prds',this.hintProducts);


    //console.log(category.substr(0,lengthSrch));
  }
checkk(eve:any){
  let parent=this;  parent.hintProducts=eve;
 setTimeout(function(){   },100);

}

  hintPull(val:any,id:any){ console.log(val);
    this.searchObject=val;
    this.globalService.setData({
      'productId':id,
      //'productSearch':val
    });

  }

  closeSearchBoxHintContainer(){
     let parent:any=this;
     setTimeout(function(){
       parent.hintContainer=false;
     },500);
  }


doScroll(pos:any){

if(pos=="R"){
 this.scrollPos=this.scrollPos+300;
 if(this.scrollPos<0){ this.scrollPos=0; }
   $('.product-slider').animate({
     scrollLeft: this.scrollPos
 }, 500);
}
if(pos=="L"){

 this.scrollPos=this.scrollPos-300;
 if(this.scrollPos<0){ this.scrollPos=0; }
   $('.product-slider').animate({
     scrollLeft: this.scrollPos
 }, 500);
}

}



  getPublicProducts(){ //console.log(this.categoryFilterItem);
       let parent=this; this.JumpCnt=0;
            $.post(this.ApiURL+'products/public_product_view',{
                 'data':{
                      'filter':{
                  //    'name': parent.searchObject,
                  'name-category': parent.searchObject,
                      'category_in':parent.categoryFilterItem,
                      'credits': parent.creditsFilterItem,
                      'ratings': parent.ratingsFiterItem
                      /* similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory */
                      },
                      'extra':{
                         'pageJump':0,  /* pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined */
                         //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                      }
                 }
        },function(res:any){
           parent.products=res.products;
          // console.log('res Product',res);
                    /*      if(res!=null)
                          {
                            for(let item of res.products ){
                                  parent.products.push(item);
                               }
                            }
                            */
                            // console.log('parent.products',parent.products);

        });
}



LoadMore(){
  let parent=this;
  // parent.products=[];
  parent.JumpCnt=parent.JumpCnt+1;

  $.post(this.ApiURL+'products/public_product_view',{
       'data':{
         'filter':{
         'name': parent.searchObject,
         'category_in':parent.categoryFilterItem
         /* similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory */
         },
         'extra':{
               'pageJump':parent.JumpCnt,  /* pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined */
               //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
            }
       }
  },function(res:any){
// =res.products;
// console.log('res Product',res);
//var array = Object.keys(res.products).map(function (key) { return res.products[key]; });
   //parent.products=parent.merge_objects(parent.products,array);

setTimeout(function () {
   if(res.products!=null)
      {

     for(let item of res.products ){
           parent.products.push(item);
        }
      }
      $('#lm').trigger('click');
    //  console.log('parent.products LoadMore',parent.products);
    }, 200);

  });

}

prdLoadDummy(){
//**********Don't delete this dummy function.its use for load product data on view
}




productPage(val:any){
  var token= localStorage.getItem('GBCItoken');
 let service=this.globalService.getData();
// console.log(service,val);
 service.productSearch=val;
 this.globalService.setData(service);
//console.log(this.globalService.getData());
  if(token=='' || token==null){
     this.redirect('page-login',{});
   }else{
     this.redirect('page-product',{});
   }
  //#page-product
}
productPageSlider(productId:any){
  var token= localStorage.getItem('GBCItoken');
 let service=this.globalService.getData();
// console.log(service,val);
this.globalService.setData({
'productId':productId
});
//console.log(this.globalService.getData());
  if(token=='' || token==null){
     this.redirect('page-login',{});
   }else{

     this.redirect('page-product',{});
   }
  //#page-product
}
checkAllBox(event:any){
//  console.log("event",event);
  var checkboxes = document.getElementById('CATList');

      // checkboxes.forEach(x => x.state = event.target.checked)

    // $(".CATList input:checkbox").prop('checked', $(this).prop("checked"));

}

changeplusicon(){

  if($('.rt1').find($(".fa")).hasClass('fa fa-plus'))
     {
        $('.rt1').find($(".fa")).removeClass('fa fa-plus').addClass('fa fa-minus');
            $('.rt1').next().slideDown(200);
     }
     else if($('.rt1').find($(".fa")).hasClass('fa fa-minus'))
          {

              $('.rt1').find($(".fa")).removeClass('fa fa-minus').addClass('fa fa-plus');

          }
}

scroll2Top(){
  $('html, body').animate({scrollTop : 0},800);
}




}
