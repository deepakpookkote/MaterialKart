import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../app.component';

import { globalService } from './../../services/global.service';
import { ApiService } from './../../services/ApiService';

declare var $:any;
declare var swal :any;


@Component({
  //selector: 'my-app',
  styleUrls:['./app/pages/landingPage/home.template.css'],
  templateUrl: './app/pages/landingPage/home.template.html' ,
})
export class landingComponent extends AppComponent  {
    public apiKey:any=localStorage.getItem('GBCItoken');
     public products:any=[];
     public articles:any = [];
     public forrange:any=[];
     public scrollPos:number=0;
     public hintContainer:any=false;
     public searchObject:any="";
     public hintProducts:any=[];
     public getApiUrl:any=this.ApiURL;
     public accountType:any=localStorage.getItem('GBCIaccountType');
     public currentProductpage:number=0;
     public loadMoreProductBtn:boolean=false;
     public totalProducts:number=0;








     constructor( public router: Router , public globalService: globalService, public apiService:ApiService){
        super(router,globalService);
      }
 

     ngOnInit(){

           this.searchObject=this.globalService.getData().productSearch;
        this.getPublicProducts();
       this.scrollToRatings();
       this.getArticles();

for(let i=0;i<=20;i++){
  this.forrange.push('aa');
}

localStorage.removeItem('activeProductId');
this.productCompareCategory=this.globalService.getData().ComparProductCat;
// console.log('this.productCompareCategory',this.productCompareCategory);


if(this.accountType=="user" || this.accountType=="gbcistaff"){
  this.getWishlistCategory();
  this.getWishlistData('');
}

if(this.accountType=="merchant"){
  this. getRecentActivity();
}

     }



        getRecentActivity(){

          this.apiService.recentActivity({
            'data':{
              'key':this.apiKey,
              'orderByDateCreated':-1
            }
          }).then(res=>{
            this.totalProducts=res.totalProducts;
          }).catch(error=>{
            console.log('API response error ',error);
          });

        }


     hintFilter(val:any){
       let parent=this;
       parent.hintProducts=[];
      // this.globalService.setData({});
      this.globalService.setData({
        'productId':'',
        'productSearch':''
      });

       if(this.searchObject.length>1){
         this.hintContainer=true;

               this.apiService.publicProductView({
                 'data':{
                    'filter':{
                   // 'name':'af' // similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory
                    },
                    'extra':{
                      'pageJump':0,  /* pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined */
                      //'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
                      'required':['name']
                    }
               }}).then( res=>{
                       if(res.products!=null){
                          this.hintProducts=res.products;
                       }
               } ).catch(err=>{
                 console.log('Unable to process API',err)
               });



       }else{
          this.hintContainer=false;
       }

     }

     hintPull(val:any,id:any){
       this.searchObject=val;
       this.globalService.setData({
         'productId':id,
         'productSearch':val
       });

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

     getPublicProducts(  ){

      this.apiService.publicProductView({
        'data':{
           'filter':{
          // 'name':'af' // similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory
           },
           'extra':{
              'pageJump':0,  // pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined
              'orderByDateCreated':-1 // Descending order , Not mandatory order by date created
           }
      }}).then( res=>{
              if(res.products!=null){
                this.products=res.products;
              }
      } ).catch(err=>{
        console.log('Unable to process API',err)
      });



   }

   closeSearchBoxHintContainer(){
      let parent:any=this;
      setTimeout(function(){
        parent.hintContainer=false;
      },500);
   }

public loadMorefinish:any=[];

   loadMoreProducts(){
let parent:any=this;
     parent.loadMoreProductBtn=true
     this.currentProductpage++;


      this.apiService.publicProductView({
        'data':{
           'filter':{
          // 'name':'af' // similar to like statement in mysql query, i.e select * from table where name like '%f%'. Not Mandatory
           },
           'extra':{
             'pageJump':this.currentProductpage,  /* pagination, For each hit sever throws 0-25, i.e $pageJump-25 , here 25 is predefined */
             'orderByDateCreated':-1 /* Descending order , Not mandatory order by date created */
           }
      }}).then( res=>{
              if(res.products!=null){
                Array.prototype.push.apply(this.products, res.products);
                  parent.loadMoreProductBtn=true;parent.loadMorefinish=res.products;
                  setTimeout( function(){ parent.loadMoreProductBtn=false;}, 1000);
              }

                if(res.products==null){
                  parent.loadMorefinish=res.products;
                }
                console.log('parent.loadMorefinish',parent.loadMorefinish);


      } ).catch(err=>{
        console.log('Unable to process API',err)
      });


   }

   productPage(val:any){
     var token= localStorage.getItem('GBCItoken');
    let service=this.globalService.getData();
// console.log(service,val);
  //  service.productSearch=val;
    this.globalService.setData({
      'productSearch':val
    });
    //this.globalService.setData(service);
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

   getArticles(){
    this.apiService.publicArticleView({}).then(res=>{
      this.articles = res.articles;
    }).catch(error=>{
      console.log('Unable to process API',error)
    });
   }



   redirectToArticle(articleurl:any){
      window.location.href= articleurl;
   }


// addCompareProduct(prodID:any,idx:any){
//   let parent=this;
//       if(parent.productCompareData.length>=0 && parent.productCompareData.length<3){
//   parent.productCompareData.push(prodID);
//   this.globalService.setData({
//     'ComparProductId':parent.productCompareData
//   });
//   localStorage.setItem('ComparProductId', parent.productCompareData);
//     // let service1=this.globalService.getData().ComparProductId;
//   // console.log('parent.productCompareData',parent.productCompareData);
//   }else{
//     alert("Maximum (3) product was selected for comparison");
//   }
//
// }
//
// removeCompareProduct(RmprodID:any){
//   let parent=this;
//   var Pindex=parent.productCompareData.indexOf(RmprodID);
//   if (Pindex > -1) {
//         parent.productCompareData.splice(Pindex, 1);
//         localStorage.setItem('ComparProductId', parent.productCompareData);
//         // console.log('Remove parent.productCompareData',parent.productCompareData);
//       }
// }
//
// findInCompare(productId:any){
//     let parent=this;
//   if(parent.productCompareData.indexOf(productId)>-1){
//     return true;
//   }
// }


// addTag(tag:string){
//   let parent=this;
//   let tagenter:any=document.getElementById("tagenter");
//   tagenter.value="";
//   if(parent.tags.length<5 && tag!='')
//   {parent.tags.push(tag);}
// }
//
// removeTags(indx:any){
// let parent=this;
//   var Pindex=parent.tags.indexOf(indx);
//
//
//   // console.log('indx',indx,'Pindex',Pindex,parent.tags);
//
//         parent.tags.splice(indx, 1);
// // console.log('parent.tags',parent.tags);
//
//
// }






}
