import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import { globalService } from './services/global.service';
import { ApiService } from './services/ApiService';


import { TopMenu } from './directives/top-menu/top-menu';
// import swal from 'sweetalert2';
declare var swal :any;
declare var $:any;

@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>`,
})
export class AppComponent  {
  name = 'GBCI';

//public ApiURL:any='http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';

//Final cloud Api link
public ApiURL:any='https://product.gbci.org/green-building/dev-1/api/app/index.php?path=';

// public ApiURL:any='http://172.16.0.224/API_GreenBuilding/api/app/index.php?path=';

//public ApiURL = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';


//public ApiURL:any='httpS://product.gbci.org/green-building/dev-1/api/app/';
//public ApiURL:any='https://product.gbci.org/green-building/dev-1/api/app/';

//public ApiURL:any='https://gbci-devdesk.g10.pw/';
// public ApiURL:any='http://172.16.0.224/API_GreenBuilding/api/app/';
// public ApiURL:any='http://localhost/API_GreenBuilding/api/app/';
//


     public wishListWindow:any=false;
      public wishListmanage:any=false;
      public wishItem:any;
      public wishlistSuccessMsg:any="";
      public wishListCategObj:string="";

      public wishlistCategory:any=[];
      public wishlistData:any=[];
      public availableWishlists:any=[];
      public wishlistCategoryMap:any=[];
      public productCompareData:any=[];
       public productCompareCategory:any;
       public wishListshare:any=false;
       public ViewMLflag:any=false;
       public sharedEmailObjId:any=[];
       public sharedEmailObj:any=[];

       public sharehintEmail:any=[];
       public sharehintContainer:any=false;
       public sharesearchObject:any;
       public cmpErrshow:boolean=false;
      //  public sharedEmailObj:any=[];
      //  public sharedEmailObjId:any=[];

       public shareErr:any=false;
       public WLRenameFlag:boolean=false;
       public shareErrMsg:string="";
       public SelectedProjCategory:string="";
       public apiKey:any=localStorage.getItem('GBCItoken');



//Global Variables


 constructor(
        public router: Router,
        public globalService: globalService,
        public apiService: ApiService ) {   }

 ngOnInit(){

 }

  stringLimit(str:string,limit:number){
  //  return str.substring(0,10)
   return str.substring(0,limit);
  }

  redirect(page:any,parameters:any){
  //  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  this.router.navigate([""+page+""], { queryParams: parameters } );
  }

 validateEmail(email:any) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
validateSpecialCharacter(str:any){
  var re= /^[a-zA-Z0-9]*$/ ;
  return re.test( str );
}
validateNumber(str:any){
  var re= /^[0-9]*$/ ;
  return re.test( str );
}


scrollToRatings(){
  $('html, body').animate({
      scrollTop: $("body").offset().top
  }, 200);
  /*
  if(this.router.url=="/page-landing#ratingspos"){
    $('html, body').animate({
        scrollTop: $("#ratings-info").offset().top
    }, 2000);

  }else{
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 200);
  }
  */
}

merge_objects(obj1:any,obj2:any){
 var obj3 = {};
 for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
 for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
 return obj3;
}



/* Wishlist Functionalities */

        renameWishlist(NewCategoryTextId:any,oldCategory:any){

          let categoryText:any=document.getElementById("wishlistCategRename"+NewCategoryTextId);
          let parent:any=this;
          parent.WLRenameFlag=false;

          $.post(this.ApiURL+'wishlist/updatewishlist',{
               'data':{
                  'key':parent.apiKey,
                  'form':{
                    'oldCategory':oldCategory,
                    'newCategory':categoryText.value
                  }
                  // 'filter':{
                  //    'accountType':parent.accountType
                  //           }

               }
          },function(res:any){
            if(res.status=='success'){
              parent.getWishlistCategory();
              parent.WLRenameFlag=true;
              setTimeout( function(){ parent.WLRenameFlag=false;}, 3000);
            }


     //  console.log('Wishlist Category',res);
          });
        }



        removeWishlist(NewCategoryTextId:any,oldCategory:any){
          let parent:any=this;
          // var r = confirm("Delete all products from "+oldCategory+".");
            swal({
              title: 'Are you sure?',
              text: "Delete all products from "+oldCategory+".",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Delete it!',
              cancelButtonText: 'No, keep it'
            }).then(function() {
              $.post(parent.ApiURL+'wishlist/deletewishlist',{
                   'data':{
                      'key':parent.apiKey,
                      'form':{
                        'oldCategory':oldCategory,
                      }
                   }
              },function(res:any){
                  swal(
                    'Removed!',
                    'All product has been deleted.',
                    'success'
                  )

                  setTimeout( function(){ swal.close();}, 1000);
                  parent.getWishlistCategory();
                  parent.getWishlistData();
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

        removeParticularWishlist(productId:any){
            let parent:any=this;
          var categoryName=this.wishlistCategoryMap[productId];
          // var r = confirm("This product will be removed from "+categoryName+" project.");
          swal({
      title: 'Are you sure?',
      text: "This product will be removed from "+categoryName+" project.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!',
      cancelButtonText: 'No, keep it'
    }).then(function() {
        $.post(parent.ApiURL+'wishlist/deletewishlist',{
             'data':{
                'key':parent.apiKey,
                'form':{
                  'productId':productId,
                }

             }
        },function(res:any){
          swal(
            'Removed!',
            'Your product has been removed.',
            'success'
          )

          setTimeout( function(){ swal.close();}, 1000);
         parent.getWishlistCategory();
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



        getWishlistCategory(){
          let parent:any=this;
          $.post(this.ApiURL+'wishlist/viewwishlistcategory',{
               'data':{
                  'key':parent.apiKey,
                  'filter':{
                     'category':parent.categoryFilter
                            }

               }
          },function(res:any){
            if(res!=null){
              parent.wishlistCategory=res.categories;
                  // parent.getWishlistData();
            }

     //  console.log('Wishlist Category',res);
          });
        }

        getFilterCategory(categoryFilter:any){

          let parent:any=this;
          $.post(this.ApiURL+'wishlist/viewwishlistcategory',{
               'data':{
                  'key':parent.apiKey,
                  'filter':{
                     'category':categoryFilter
                    //  'accountType':parent.accountType
                  }

               }
          },function(res:any){
            if(res!=null){
              parent.wishlistCategory=res.categories;
                  // parent.getWishlistData();
            }

     //  console.log('Wishlist Category',res);
          });
        }


             getWishlistData(category:any){
               let parent:any=this;
               $.post(this.ApiURL+'wishlist/viewwishlists',{
                    'data':{
                       'key':parent.apiKey,
                        'filter':{
                           'category':category
                          //  'accountType':parent.accountType
                        }

                    }
               },function(res:any){
                 parent.wishlistData=res.products;
                 parent.availableWishlists=res.availableWishlists;
                 parent.wishlistCategoryMap=res.wishlistCategoryMap;
           //console.log('Wishlist Category', parent.wishlistData);
               });
             }

             findInWishlist(productId:any){
             if(this.availableWishlists!='' && this.availableWishlists!=undefined)
             {
               if(this.availableWishlists.indexOf(productId)>-1){
                 return true;
               }
             }
             }


                wishListPopup(product:any,type:any){
                  let parent:any=this;
                  if(type==true){
                      parent.wishItem=product;
                     setTimeout(function(){ parent.wishListWindow=true; },400);
                   }
                }




                modelClose($event:any){
                  //console.log($event.target.parentNode.id);
                  //console.log($event.target.className);
                  if($event.target.className=="modal-window zoomInUp animated"){
                    this.wishListWindow=false;
                    this.wishListmanage=false;
                    this.wishListshare=false;
                    this.ViewMLflag=false;
                    this.sharedEmailObjId=[];
                    this.sharedEmailObj=[];
                  }
                }


                pushWishlist(productId:any,category:any){
                  let parent:any=this;
                  let tagList:any;
                  if(productId!=''&& category!='' && category!=undefined){
                    parent.tagList=this.globalService.getData().ProjectTags;
                      this.wishListCategObj='';
                      this.wishlistSuccessMsg='<div class="alert alert-info" role="alert"><i class="fa fa-thumbs-up" aria-hidden="true"></i> Successfully Added </div>'



             $.post(this.ApiURL+'wishlist/addwishlist',{
                  'data':{
                     'key':parent.apiKey,
                       'form':{
                       'productId': productId,
                       'category':category,
                       'tags':parent.tagList
                         }
                        //  'filter':{
                        //    'accountType':parent.accountType
                        //  }
                  }
             },function(res:any){
             parent.getWishlistCategory();
             parent.getWishlistData();
             //  console.log('Product Public List Response',res);
             });


                     setTimeout(function(){ parent.wishListWindow=false; parent.wishlistSuccessMsg=""; },5000);
                  }
                }



      /* Wishlist Functionalities */




      addCompareProduct(prodID:any,ProdCat:any){
        let parent=this;


        this.productCompareData=[];
        this.productCompareData=this.globalService.getData().ComparProductId;


         if(this.productCompareData==undefined ){ this.productCompareData=[]; }
         if(this.productCompareData.length>=0 && this.productCompareData.length<2){
            //  console.log('this.productCompareData.length',this.productCompareData.length);

             if(this.productCompareData.length==0)
             {
               this.globalService.setData({
                 'ComparProductCat':ProdCat
               });

               this.productCompareCategory=this.globalService.getData().ComparProductCat;
            //  console.log('this.productCompareCategory',this.productCompareCategory);
             }

             if(this.productCompareCategory=='' || this.productCompareCategory==ProdCat){

               this.productCompareData.push(prodID);
               this.globalService.setData({
                 'ComparProductId':this.productCompareData
               });

             }else{

                swal({
            title: 'Message !',
            text: "You can select only "+this.productCompareCategory+" for comparison",
            type: 'warning',
            showConfirmButton:false,
          }).then(function () {},);
            setTimeout( function(){ swal.close();}, 2000);

             }

          }else{
              // alert("Maximum (3) product was selected for comparison");
              swal({
                 title: 'Message',
                 text: "Maximum (2) product was selected for comparison",
                 type: 'warning',
                 showConfirmButton:false,
               }).then(function () {},);
               setTimeout( function(){ swal.close();}, 2000);

          }




      }


      removeCompareProduct(RmprodID:any){

          this.productCompareData=this.globalService.getData().ComparProductId;
        var Pindex=this.productCompareData.indexOf(RmprodID);
        if (Pindex > -1) {
              this.productCompareData.splice(Pindex, 1);
                      }
            // console.log('this.productCompareData.length',this.productCompareData.length);
          if(this.productCompareData.length==0){
            this.globalService.setData({
              'ComparProductCat':''
            });
            this.productCompareCategory=this.globalService.getData().ComparProductCat;
           // console.log('this.productCompareCategory',this.productCompareCategory);
          }

      }

      ClearCompareData(){
        this.productCompareData=[];
        this.globalService.setData({
          'ComparProductId':this.productCompareData
        });
        this.globalService.setData({
          'ComparProductCat':''
        });
        // console.log("clear data");
      }

      GotoComparePage(){
        let parent=this;
        // console.log('this.productCompareData',parent.productCompareData);
        if(parent.productCompareData.length>=2){
          parent.cmpErrshow=false;
          parent.redirect('compare-product',{});
        }else{
          parent.cmpErrshow=true;
           setTimeout( function(){ parent.cmpErrshow=false;}, 2000);
        }

      }

      findInCompare(productId:any){
          this.productCompareData=this.globalService.getData().ComparProductId;

          if(  this.productCompareData!=undefined ){
            if(this.productCompareData.indexOf(productId)>-1  ){
              return true;
            }
          }

      }

      ProductShareFilter(val:any,indx:any){

        this.sharehintEmail=[];
        this.shareErr=false;

      this.apiService.usersPublic_users_list({
           'data':{
              'key':this.apiKey,
              'filter':{
                 'email':val
                       },
               'extra':{
                     'required':['firstName','email','lastName']
                      }

           }
      }).then(res=>{
        if(res.users!=null) {
          this.sharehintContainer=true;
                this.sharehintEmail=res.users;
            }
          }).catch(error=>{
              console.log('Error !',error);
          });



       //  }else{
       //          this.sharehintContainer=false;
       //    }

      }



      sharehintPull(val:any,UsrId:any){
    let parent=this;
            parent.sharesearchObject="";

             //  let tagenter:any=document.getElementById("emlSearch");
             //  tagenter.value="";
             var foundPresent = $.inArray(val, parent.sharedEmailObj) > -1;
             // console.log('foundPresent',foundPresent);
             if(foundPresent==false){
                parent.shareErr=false;
              if(parent.sharedEmailObj.length<5 && val!='')
              {

                parent.sharedEmailObj.push(val);
               //  parent.sharedEmailObjId.push({uid:UsrId,cat:parent.SelectedProjCategory});
               parent.sharedEmailObjId.push(UsrId);
               //  console.log('parent.sharedEmailObjId',parent.sharedEmailObjId);

              }else{
                parent.shareErr=true;
                parent.shareErrMsg=" Maximum member added to this project !";
              }
            }else{
              parent.shareErr=true;
              parent.shareErrMsg=" Member already added to this project !";
            }
      }

      removeEmail(indx:any){
      let parent=this;

              parent.sharedEmailObj.splice(indx, 1);
              parent.sharedEmailObjId.splice(indx, 1);
             //  console.log('parent.sharedEmailObjId',parent.sharedEmailObjId);

      // console.log('parent.tags',parent.tags);


      }


      closeShareContainer(){
         let parent:any=this;
         setTimeout(function(){
           parent.sharehintContainer=false;
         },800);
      }

      GetProjectCat(idx:any,ProJcat:any){
        let parent:any=this;
        parent.SelectedProjCategory=ProJcat;

      }

      SharingProjects(){
        let parent=this;

                if(parent.sharedEmailObjId.length>0){
                  $.post(this.ApiURL+'projects/shareProjects',{
                       'data':{
                          'key':parent.apiKey,
                          'filter':{
                             'sharingData':parent.sharedEmailObjId,
                             'sharingCategory':parent.SelectedProjCategory
                           }


                       }
              },function(res:any){
                   console.log('res',res);

                   if(res.status=='success'){
                     swal({
                title: 'Added',
                text: "Member has been added.",
                type: 'success',
                showConfirmButton:false,
                // confirmButtonText: 'Yes, delete it!'
              });

             setTimeout( function(){ swal.close();
               parent.SelectedProjCategory="";
               parent.sharedEmailObjId=[];
               parent.sharedEmailObj=[];
               parent.wishListWindow=false;
               parent.wishListmanage=false;
               parent.wishListshare=false;
             }, 1500);

           }else{
             parent.shareErr=true;
             parent.shareErrMsg="Error on adding member";
           }

              });


              }else{
                parent.shareErr=true;
                parent.shareErrMsg="No member for add";
              }
           }


 }
