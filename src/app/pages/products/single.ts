import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import {Location} from '@angular/common';



import { AppComponent } from './../../app.component';

import { globalService } from './../../services/global.service';
import { ApiService } from './../../services/ApiService';


declare var $:any;
declare var swal :any;

@Component({
//  selector: ' ',
  styleUrls:[`./app/pages/products/single.css`],
//  template: `  `,
templateUrl: './app/pages/products/single.template.html'
})
export class SingleProductComponent  extends AppComponent  {
   pageContent = '';
   public service:any;
   public product:any={};
   public getApiUrl:any=this.ApiURL;
   public apiKey:any=localStorage.getItem('GBCItoken');
    public accountType:any=localStorage.getItem('GBCIaccountType');
    public CurrentDateTime:any;
    public Comments:any=[];
    public currentUserInfo:any;
    public hideMenu1:boolean=false;
    public hideMenu2:boolean=false;

    public userhintContainer:boolean=false;
    public UserListErr:boolean=false;
    public messageUnread:boolean=true;
    public UserListErrMsg:any="";
    public userhintEmail:any=[];
    public usersearchObject:any="";
    public selectedMessageUser:any="";
    public selectedMessageUserID:any="";
    public curr_hour:any;public curr_min:any;public curr_sec:any;
    private productInProjects:any={};
  public merchantInfo:any=[];

  private commentUsers:any={}; private showMessanger:boolean=false;

  private messagesInd:any={};
  private messageFlag:string="";
  private messageFlagInput:any={};
    public addedParameters:any=[];


private credits:any={
	"Solar Reflectance - 3 year aged": "Heat Island Reduction",
	"Solar Reflective Index - Initial (low-slope roof)": "Heat Island Reduction",
	"Kitchen Faucet flow rate - lpm/gpm at 60 Psi/415 kPa": "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
	"WC flush rate - lpf/gpf": "Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
	"SHGC": "Minimum Energy Performance (P) & Optimize Energy Performance",
	"SU-value (W/sqm/K or Btu/h·sqft·°F)HGC": "Minimum Energy Performance (P) & Optimize Energy Performance",
	"Visible Light Transmittance": "Minimum Energy Performance (P) & Optimize Energy Performance",
	"Environmental Product Declaration": "BPDO: Environmental Product Declarations",
	"FSC certified wood": "BPDO: Sourcing of Raw Materials",
	"Recycled Content": "BPDO: Sourcing of Raw Materials",
	'Bio-based material as per SAN"s': "BPDO: Sourcing of Raw Materials",
	"Health Product Declaration": "BPDO: Material Ingredients",
	"Cradle to Cradle Certification": "BPDO: Material Ingredients",
	"REACH compliant": "BPDO: Material Ingredients",
	"ANSI/BIFMA e3 Furniture Sustainability Standard": "BPDO: Material Ingredients",
	"Declare": "BPDO: Material Ingredients",
	"Lead Content": "PBT Source Reduction: Lead, cadmium and Copper",
	"Cadmium Content": "PBT Source Reduction: Lead, cadmium and Copper",
	"VOC content": "Low-Emitting Materials",
	"VOC emissions": "Low-Emitting Materials",
	"Surface Reflectance": "Acoustic Performance",
	"Noise Reduction Coefficient": "Acoustic Performance"
}

private creditsPossible:any=[]; private leadsPossible:any=[];

private leadbdc:any=[
		"Heat Island Reduction",
		"Minimum Energy Performance (P) & Optimize Energy Performance",
		"Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
		"BPDO: Environmental Product Declarations",
		"BPDO: Sourcing of Raw Materials",
		"BPDO: Material Ingredients",
		"PBT Source Reduction: Lead, cadmium and Copper",
		"Low-Emitting Materials",
		"Acoustic Performance",
		"Daylight"
	];

private leadidc:any=[
		"Minimum Energy Performance (P) & Optimize Energy Performance",
		"Indoor Water Use Reduction (P) & Indoor Water Use Reduction",
		"BPDO: Environmental Product Declarations",
		"BPDO: Sourcing of Raw Materials",
		"BPDO: Material Ingredients",
		"Low-Emitting Materials",
		"Acoustic Performance",
		"Daylight"
	];

private leadbdcPossibles:any=[]; private leadidcPossibles:any=[];

   constructor(
     public router: Router ,
     public globalService: globalService,
     public apiService: ApiService,
     private _location: Location
 ){
      super(router,globalService,apiService);
      this.apiService.base=this.ApiURL;
    }

   ngOnInit(){
     this.service=this.globalService.getData();
     this.currentUserInfo=this.globalService.getData().userInfo;
     $('.content').hide();





     this.scrollToRatings();
    let service=this.globalService.getData();
    this.keepProductId();
    this.getProduct();
  //  this.getMerchantInfo();

    $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
        $('.scrollToTop').fadeIn();
      } else {
        $('.scrollToTop').fadeOut();
      }
    });


    if(this.accountType=="user" || this.accountType=="gbcistaff"){
      this. getWishlistCategory();
      this.getWishlistData('');
    }


      this.getComentUsers();
      this.productInWishlist();
   }

   goback(){
        this._location.back();
    }

fetchMessanger(member:any){
  this.showMessanger=true;
  this.apiService.ComParticularMemberMessage({
    data:{
      key:this.apiKey,
      filter:{
        ownerId:this.currentUserInfo.merchantId,
        memberId:member,
        productId:this.globalService.getData().productId
      }
    }
  }).then( response => {
     this.messagesInd=response.messages;
  }).catch( error => {
    console.log('Error while logging in', error)
  });

}

   keepProductId(){

     let localId=localStorage.getItem('activeProductId');
     if(localId!="" && localId!=null && localId!=undefined){ this.service.productId=localId; }
     if(this.service.productId){
       localStorage.setItem('activeProductId',this.service.productId);
       this.getProduct();
     }else{
       this.redirect('page-listing',{});
     }
     //console.log(service.productSearch );
   }
public productParameters:any=[];
public param:any=[];
   getProduct(){
       let paramFull:any;let Segmentlist:any;
     let parent:any=this;
     let productId=localStorage.getItem('activeProductId');
     $.post(this.ApiURL+'products/public_product_view',{
    	    'data':{
            'filter':{
              'productId':productId
            }
    	    }
        },function(res:any){
          parent.product=res.products[0];

          if(res.merchantInfo!='' && res.merchantInfo!=null){
            parent.merchantInfo=res.merchantInfo;
           }

          // console.log(' parent.product', parent.product);
         if(parent.product!='' && parent.product!=null ){
            parent.addedParameters = parent.product.v2parameters;
            parent.paramFull=parent.product.v2parameters;

            for (let key in parent.paramFull){
                // console.log( key + ": " + parent.paramFull[key]);
                parent.Segmentlist=parent.paramFull[key];
            for (let key1 in parent.Segmentlist){
                parent.param.push(key1);
                // console.log( key1 + ": " + parent.Segmentlist[key1]);
            }


            }

         }


         for(let item of parent.param){
           let paramName=parent.credits[item];
          // console.log( parent.credits );
           if( ( (parent.creditsPossible).indexOf( paramName ) > -1 )==false ){
               parent.creditsPossible.push( paramName );
            }
         }
        // console.log( parent.creditsPossible );


for(let item of parent.creditsPossible){

//checking in leadv4bdc
if( parent.leadbdc.indexOf(item) > -1 ){

if( (parent.leadbdcPossibles.indexOf(item) >-1 ) ==false ){
  parent.leadbdcPossibles.push(item);
}

  if( ( parent.leadsPossible.indexOf( 'LEED V4 BD+C CREDITS/PREREQUISITES' ) > -1 ) ==false ){
    parent.leadsPossible.push( 'LEED V4 BD+C CREDITS/PREREQUISITES'  );
  }

}

//checking in leadv4idc
if( parent.leadidc.indexOf(item) > -1 ){

  if( (parent.leadidcPossibles.indexOf(item) >-1 ) ==false ){
    parent.leadidcPossibles.push(item);
  }

  if( ( parent.leadsPossible.indexOf( 'LEED V4 ID+C CREDITS/PREREQUISITES' ) > -1 ) ==false ){
    parent.leadsPossible.push( 'LEED V4 ID+C CREDITS/PREREQUISITES'  );
  }

}


} //console.log(parent.leadbdcPossibles);

//console.log('lead',  parent.leadsPossible);


    	    });
   }

   getMerchantInfo(){
     this.apiService.accountInfoView({
       data:{
         key:this.apiKey
       }
     }).then(res=>{
       // console.log('res',res);
       this.merchantInfo=res.userInfo[0];
       console.log('res',this.merchantInfo);


     }).catch(err=>{
       console.log("Unable to get profile information !",err);
     });
   }




        getUserListInfo(val:any,indx:any){
          let parent=this;

                 this.userhintContainer=true;

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
                  this.userhintContainer=true;
                  this.userhintEmail=res.users;
              }
            }).catch(error=>{
                console.log('Error !',error);
            });


        }

public selectedMessageUserFN:any="";

        UserhintPull(val:any){

      // console.log('val',val);
      this.usersearchObject=val.email;

      this.selectedMessageUser=val.email;
      this.selectedMessageUserID=val.userId;
      this.selectedMessageUserFN=val.firstName;


      this.hideMenu1=false;
        // console.log('selectedMessageUser',parent.selectedMessageUser);
              // parent.usersearchObject=val;
        }


        closeUserListContainer(){
           let parent:any=this;
           setTimeout(function(){
             parent.userhintContainer=false;
           },800);
        }



   scroll2Top(){
     $('html, body').animate({scrollTop : 0},800);
   }

openChat(){
  this.messageUnread=false;
    $('#qnimate').addClass('popup-box-on');
}
closeChat(){
    $('#qnimate').removeClass('popup-box-on');
}



productInWishlist(){
  this.apiService.productInWishlist({
    data:{
       key:this.apiKey,
       form:{
         productId :this.globalService.getData().productId
       }
    }
  }).then(response=>{
       if(response){
        if(response.status=="success"){
         this.productInProjects=response.records;
        }
      }
  }).catch(error=>{
    console.log('Error while logging in', error)
  });
}



addComment(comment:string){
  let parent=this;


if(parent.selectedMessageUser!=''){
parent.UserListErr=false;
parent.UserListErrMsg="";

    parent.CurrentDateTime="";

    var d = new Date();

      parent.CurrentDateTime=Date();


    let tagenter:any=document.getElementById("messgenter");
    tagenter.value="";

    if(comment!='')
    {
      parent.Comments.push({'msg':comment,'date':parent.CurrentDateTime,'fromUser':parent.currentUserInfo.merchantId,'ProductId':parent.service.productId,'ToUser':parent.selectedMessageUserID});
      // var $t = $('.popup-messages');
      // $t.animate({"scrollTop": $('.popup-messages')[0].scrollHeight-40}, "slow");
    //  console.log('parent.Comments',parent.Comments);
    }


}else{


    parent.UserListErr=true;
    parent.UserListErrMsg="Please,enter the user email to message !";
    setTimeout(function(){
      parent.UserListErr=false;parent.UserListErrMsg="";
    },4000);


}


}

clearComments(){
  this.Comments=[];
}

SendPress(){


  let tagenter1:any=document.getElementById("messgenter");

    let toID    = this.selectedMessageUserID;
    let fromID  = this.currentUserInfo.merchantId;
    let message = tagenter1.value;
    let toManufacturer = this.messageFlagInput['manufacturer'];
    let toSiteAdmin = this.messageFlagInput['siteadmin'];

    if( (toID!=''||toManufacturer==true||toSiteAdmin==true) && message!='') {

this.apiService.ComproductPageAdd({
  data:{
     key:this.apiKey,
     form:{
       from           : fromID,
       to             : toID,
       message        : message,
       productId      : this.globalService.getData().productId,
       toManufacturer : toManufacturer,
       toSiteAdmin    : toSiteAdmin
     }
  }
}).then(response=>{
     if(response){
      if(response.status=="success"){

      //  this.getComentUsers();
        tagenter1.value="";
        this.selectedMessageUserID="";
        swal({
          title: 'Message',
          text: "Your message has been submitted.",
          type: 'success'
        });
          setTimeout( ()=>{ swal.close(); }, 1000);
      }
     }
}).catch(error=>{
  console.log('Error while logging in', error)
});



 //this.addComment(tagenter1.value);

  }else{
    this.UserListErr=true;
    this.UserListErrMsg="Required fields should not be empty! ";
    setTimeout(()=>{
      this.UserListErr=false;this.UserListErrMsg="";
    },4000);
  }

}


getComentUsers(){
  this.apiService.ComproductPageView({
    data:{
      key:this.apiKey,
      filter:{
        productId:this.globalService.getData().productId
      }
    }
  }).then( response => {
     this.commentUsers=response.members;
  }).catch( error => {
    console.log('Error while logging in', error)
  });
}

CommentCollapse(e:any){

  //  $("#w3s").attr("href", "https://www.w3schools.com/jquery");
  //console.log('e',e.srcElement.id);
  //  $("#"+e.srcElement.id).attr("data-target", "#"+e.srcElement.id);
  //
  // $('.content').removeClass('active').next().slideUp(); //Remove all "active" state and slide up the immediate next container
  //     $(this).toggleClass('active').next().slideDown();
  //     return false;
}
toArrayCategory(obj:any){
  let ary:any=Object.keys( obj ).map(function (key){ return key; });
    return ary.sort();
}

toArrayValue(obj:any){
   return Object.keys(obj).map(function (key) { return obj[key]; });

}
toArrayKeyValue(obj:any){
  return Object.keys(obj).map(function (key) { return { key:key,value: obj[key]}; });
}





 }
