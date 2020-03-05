import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router,NavigationExtras } from '@angular/router';
import { AppComponent } from './../../../app.component';
import { globalService } from './../../../services/global.service';
declare var swal :any;
declare var $:any;
@Component({
  styles:[`

    `],
  templateUrl: './app/pages/merchant/products/view.template.html' ,
})
export class MerchantProductView extends AppComponent  {
   public products:any;
   public getApiUrl:any=this.ApiURL;
   public apiKey:any=localStorage.getItem('GBCItoken');
   public pageJump:number=0;
   public srchName:any=""; public srchCategory:any;

   constructor( public router: Router ,public globalService: globalService){
     super(router,globalService);
   }
   ngOnInit(){
     this.getProducts();
   }

   filterFunction(){
     let parent:any = this;
    parent.getProducts();
    parent.pageJump=0;
   }

   getProducts(){
     let parent:any = this;
     if(parent.pageJump<0){ parent.pageJump=0; }
     //  console.log(parent.apiKey);
      $.post(this.ApiURL+'Merchant/merchant_product_view',{
         'data':{
             'key':parent.apiKey,
             'filter':{
               'name': parent.srchName,
               'category':parent.srchCategory
             },
             'extra':{
               'pageJump':parent.pageJump
             }
         }
         },function(res:any){
           parent.products = res.products;
           //this.productsInfo = [1];
            // console.log(this.products);
         });
   }

   //Edit Selected productsInfo
   editProduct(productId:any){
     let navigationExtras: NavigationExtras = {
       queryParams: { 'session_id': 123 },
       preserveQueryParams: true,
       preserveFragment: true
     };
     console.log('productID',productId);
     localStorage.setItem('productId','');
     this.globalService.setData({'productId':productId});
     this.router.navigate(['./page-merchant-product-edit']);
     // to append productId in url.
     //this.router.navigate(['./page-merchant-product-edit'],{ queryParams: {productId:productId} });
   }

   //delete product
  //  deleteProduct(productId:any){
  //
  //   var r = confirm("This product will be removed from database.");
  //     if (r == true) {
  //
  //   let parent=this;
  //       $.post(this.ApiURL+'Merchant/merchant_product_delete',{
  //         'data':{
  //           'key':parent.apiKey,
  //           'filter':{
  //              'productId': productId
  //            }
  //         }
  //       },function(res:any){
  //           parent.getProducts();
  //       });
  //     }else{
  //
  //     }
  //
  // }


  deleteProduct(productId:any){
      let parent:any=this;


    swal({
title: 'Are you sure?',
text: "This product will be removed from database.",
type: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Yes, Remove it!',
cancelButtonText: 'No, keep it'
}).then(function() {
  $.post(parent.ApiURL+'Merchant/merchant_product_delete',{
    'data':{
      'key':parent.apiKey,
      'filter':{
         'productId': productId
       }
    }
  },function(res:any){
    swal(
      'Removed!',
      'Your product has been removed.',
      'success'
    )

    setTimeout( function(){ swal.close();}, 1000);
    parent.getProducts();
   //  console.log('Wishlist Category',res);
  });

}, function(dismiss:any) {
if (dismiss === 'cancel') {
  swal(
    'Cancelled',
    'Your product is safe :)',
    'error'
  )
  setTimeout( function(){ swal.close();}, 1000);
}
});

}

 }
