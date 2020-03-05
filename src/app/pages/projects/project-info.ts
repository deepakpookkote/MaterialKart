import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router,ActivatedRoute } from '@angular/router';
import { AppComponent } from './../../app.component';

import { globalService } from './../../services/global.service';
import { ApiService } from './../../services/ApiService';

declare var $:any;
declare var swal :any;


@Component({
  //selector: 'my-app',
  styleUrls:  [`./app/pages/projects/project-info.css`],
  templateUrl: './app/pages/projects/project-info.template.html' ,
})
export class ProjectComponent extends AppComponent  {
    public apiKey:any=localStorage.getItem('GBCItoken');
     public products:any=[];
     public articles:any = [];
     public forrange:any=[];
     public scrollPos:number=0;

     public getApiUrl:any=this.ApiURL;
     public accountType:any=localStorage.getItem('GBCIaccountType');
     public currentProductpage:number=0;
     public loadMoreProductBtn:boolean=false;
     public totalProducts:number=0;

     public sharehintEmail:any=[];
     public sharehintContainer:any=false;
     public sharesearchObject:any;
    //  public sharedEmailObj:any=[];
    //  public sharedEmailObjId:any=[];

     public shareErr:any=false;
     public shareErrMsg:string="";
     public SelectedProjCategory:string="";
      public Comments:any=[];
      public CurrentDateTime:any="";
      public likecnt:number=0;
      public dislikecnt:number=0;
      public sharedUsersList:any=[];
      public currentUserInfo:any;
      public ProjectMemeberList:any=[];

      private urlParams:any={};

      public UserListlen:any="";




     constructor( public router: Router ,
                  public globalService: globalService,
                  public route:ActivatedRoute,
                  public apiService:ApiService
                ){
        super(router,globalService,apiService);
      }


     ngOnInit(){

       //Requesting url
     this.route.params.subscribe(params=>{
        this.urlParams.category=params.category;

      });



       this.scrollToRatings();
      //  this.SharedUserList();


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
this.productCompareCategory=this.globalService.getData().ComparProductCat;
this.currentUserInfo=this.globalService.getData().userInfo;

// console.log('this.productCompareCategory',this.productCompareCategory);
// console.log('this.currentUserInfo',this.currentUserInfo);


if(this.accountType=="user" || this.accountType=="gbcistaff"){
  this. getWishlistCategory();

  // this.getWishlistData('');
  this.InitialProjectSelect();




}



     }




     scroll2Top(){
       $('html, body').animate({scrollTop : 0},800);
     }
     public acctiveidx:any;

     makeActive(indexi?:number){

      // console.log('indexi',indexi);
       $('.catSelectionActive ul li a').removeClass('active1');
      //  $('#catLeft_'+indexi).css({'color':'white'});
        $('#catLeft_'+indexi).addClass('active1');
     }

     makeActive1(indexi1?:number){
      //  localStorage.setItem('activeProject',indexi1);
       this.acctiveidx=indexi1;

      //  console.log('indexi',indexi1,this.acctiveidx);
      $('#catLeft_'+indexi1).addClass('active1');
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

categSelection(categ?:any){
  let i= (this.wishlistCategory).indexOf(categ);
   this.getWishlistData(categ);
   this.GetProjectCat(i,categ);

   this.makeActive(i);
   this.shareErrMsg='';
   this.shareErr=false;
   this.sharedEmailObjId=[];
   this.sharedEmailObj=[];
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
//console.log(this.glob alService.getData());
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




InitialProjectSelect(){

    setTimeout( ()=>{

      if(this.wishlistCategory!=null && this.wishlistCategory!=''){
  // console.log('parent.wishlistCategory',parent.wishlistCategory,parent.wishlistCategory[0]);

  let i=0;
  if( (this.urlParams.category) && (this.urlParams.category!="_") ){
      // this.categSelection(this.urlParams.category);
      i=(this.wishlistCategory).indexOf(this.urlParams.category);
  }

      this.GetProjectCat(i,this.wishlistCategory[i]);
      this.makeActive(i);
      this.shareErrMsg='';
      this.shareErr=false;
      this.sharedEmailObjId=[];
      this.sharedEmailObj=[];
      this.getWishlistData(this.wishlistCategory[i]);
        }

  },1300);

}



   GetProjectCat(idx:any,ProJcat:any){
     let parent:any=this;
     parent.SelectedProjCategory=ProJcat;
     parent.SharedUserList(parent.SelectedProjCategory);

   }

   SharingProjects(){

             if(this.sharedEmailObjId.length>0){





      this.apiService.projectsShareProjects({
           'data':{
              'key':this.apiKey,
              'filter':{
                 'sharingData':this.sharedEmailObjId,
                 'sharingCategory':this.SelectedProjCategory
               }

           }
          }).then(res=>{
            if(res.status=='success'){
                      swal({
                 title: 'Added',
                 text: "Member has been added.",
                 type: 'success',
                 showConfirmButton:false,
                 // confirmButtonText: 'Yes, delete it!'
                });

                setTimeout( ()=>{ swal.close();
                    this.SharedUserList(this.SelectedProjCategory);
                    // parent.SelectedProjCategory="";
                    this.sharedEmailObjId=[];
                    this.sharedEmailObj=[];
                    this.wishListWindow=false;
                    this.wishListmanage=false;
                    this.wishListshare=false;
                    this.ViewMLflag=false;

                }, 1500);

                }else{
                  this.shareErr=true;
                  this.shareErrMsg="Error on adding member";
                }
          }).catch(error=>{
            console.log('Error !',error);
          });


           }else{
             this.shareErr=true;
             this.shareErrMsg="No member for add";
           }
        }

        addComment(comment:string){
          let parent=this;
          parent.CurrentDateTime="";


          parent.CurrentDateTime=Date();

          let tagenter:any=document.getElementById("tagenter");
          tagenter.value="";

          if(comment!='')
          {
            parent.Comments.push({'com':comment,'date':parent.CurrentDateTime});

            // this.globalService.setData({
            //   'ProjectComments:parent.Comments
            // });
  // console.log('parent.Comments',parent.Comments);
//   var wtf    = $('.commentBox');
// var height = (wtf[0].scrollHeight)+200;
// wtf.scrollTop(height);

var $t = $('.commentBox');
       $t.animate({"scrollTop": $('.commentBox')[0].scrollHeight-40}, "slow");

 // $('.commentBox').scrollTop(1E10);

          }
        }

        clearComments(){
          this.Comments=[];
        }


        SharedUserList(categories:any){
                this.apiService.projectsShareUsers({
                  data:{
                    key:this.apiKey,
                    filter:{
                        category:categories
                    }
                  }
                }).then(res=>{
                      if(res.sharedusers!=null){
                        this.sharedUsersList=res.sharedusers;
                        this.UserListlen=Object.keys(this.sharedUsersList).length;
                      }
                }).catch(error=>{
                  console.log('Error !',error);
                });
             }


             ViewMemberList(categories1:any){
               this.ViewMLflag=true;
                this.apiService.projectsShareUsers({
                  data:{
                    key:this.apiKey,
                    filter:{
                        category:categories1
                    }
                  }
                }).then(res=>{
                      if(res.sharedusers!=null){
                        this.ProjectMemeberList=res.sharedusers;
                      }
                }).catch(error=>{
                  console.log('Error !',error);
                });
             }

          removeMember(mid:string,category:string,product:string){
             this.apiService.projectsRemoveUsers({
               data:{
                 key:this.apiKey,
                 form:{
                   userId: mid,
                   productId : product,
                   category: category
                 }
               }
             }).then(res=>{
                  this.ViewMemberList(category);
                  this.SharedUserList(category);
             }).catch(err=>{
               console.log('Error !',err);
             }) ;
          }


}
