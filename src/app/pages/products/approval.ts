import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../app.component';

import { globalService } from './../../services/global.service';
// import { ApiService } from './../../services/ApiService';

declare var $:any;
@Component({
  styles:[`
    .form-control{
          border-radius: 5px;
    }

    `],
  templateUrl: './app/pages/products/product.approval.template.html' ,
})
export class ProductApprovalComponent extends AppComponent  {
   public products:any;
     public getApiUrl:any=this.ApiURL;
   public apiKey:any=localStorage.getItem('GBCItoken');
   public pageJump:number=0;
   public srchName:any=""; public srchCategory:any;
   public srchstatus:any;
   public productLen:any="";

  //  constructor( public router: Router ,public globalService: globalService,public apiService: ApiService){
  //    super(router,globalService,apiService);
  //  }
   constructor( public router: Router , public globalService: globalService){
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
      $.post(parent.ApiURL+'products/public_product_view',{
         'data':{
             'filter':{
               'name': $('#srchName1').val(),
               'status':parent.srchstatus,
               'category':$('#srchcat1').val(),
               'userRole':'admin'
             },
             'extra':{
               'pageJump':parent.pageJump,
               'required':['name','category','status','description','manufacturer','images']
             }
         }
         },function(res:any){
           if(res.products!=null){
              parent.products = res.products;
              // parent.productLen=parent.product.length;
               parent.productLen=Object.keys(res.products).length;
              // console.log('parent.productLen',parent.productLen);
           }else{
             parent.productLen=0;parent.products=[];
           }

           //this.productsInfo = [1];
            // console.log(this.products);
         });
   }
public approvedProductList:any=[];
   //Edit Selected productsInfo
ApproveSelectionClick(event:any,prodId:any){
  // console.log('event',event.target.checked,prodId);

  // var Pindex=this.approvedProductList.indexOf(RmprodID);
  // if (Pindex > -1) {
  //       this.productCompareData.splice(Pindex, 1);
  //               }

// if(event.target.checked==true)
// {
//   this.approvedProductList.push({pid:prodId,status:event.target.checked});
//
// }else{
//   this.approvedProductList.push({pid:prodId,status:event.target.checked});
// }

  // this.globalService.setData({
  //   'ApproveProductId':this.approvedProductList
  // });
  // console.log('this.approvedProductList',this.approvedProductList);


}

SaveApproveProduct(){

   let parent:any = this;


$.each($(".checkclass input:checkbox:not(:checked)"), function(index:any,evn:any){
    // console.log('nch',index,evn.value);
    parent.ProductUpdateStatus(evn.value,'hold');

});

$.each($(".checkclass input[type='checkbox']:checked"), function(index:any,evn:any){
    // console.log(index,evn.value);
    parent.ProductUpdateStatus(evn.value,'active');
});

}

ProductUpdateStatus(ProctId:any,ProdSts:any){
   let parent:any = this;
  $.post(this.ApiURL+'products/product_update',{
    'data':{
      'key':parent.apiKey,
      'filter':{
         'productId': ProctId
      },
      'form':{
        'status':ProdSts
      }
    }
  },function(res:any){
    console.log('res',res);
if(res.status=="success"){
  $("#dispmsg").html("<div style='width:50%;margin-left:50px;' class='alert alert-success animated fadeIn'> <strong>Success!</strong> Updated successfully !</div>")
}     setTimeout( function(){ ;
      $("#dispmsg").html("");
    }, 3000);
  });
}


 }
