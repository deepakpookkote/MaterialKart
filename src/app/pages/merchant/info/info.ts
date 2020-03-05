import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';
import { globalService } from './../../../services/global.service';
import { ApiService } from './../../../services/ApiService';

import { CountryDbService } from './../../../services/countryDB/countrydb.service';

declare var $:any;
declare var swal: any;

@Component({
  styles:[`

    .md-textarea {
       padding:5px!important;
     }
     .table tr td{
        padding:5px!important;
     }
     .cont .rotate {
          cursor:pointer;
          font-size: 15px;
      }


      .cont .rotate:hover{
          color: red;
          transition: 0.9s;
          transform: rotateY(180deg);
      }



    `],
  templateUrl: './app/pages/merchant/info/info.template.html' ,
})
export class MerchantInfo   {
  public products:any;
  public addMore:number=1;
    public apiKey:any=localStorage.getItem('GBCItoken');
    public accountType:any=localStorage.getItem('GBCIaccountType');

    public primaryRange:any=[];
    public infoDetail:any;



public userInfo:any={};
public firstName:any;
public lastName:any;
public merchantMail :any;
public merchantURL:any;
public merchantContactNumber:any;
public merchantCompanyDetail:any;
public merchantOfficeAddress:any;
public ContactInfo:any=[];
public regContactInfo:any=[];
public ContactInfoDisp:any=[];

public contactList:any=[];
public countryRegion:any=[];
public countrySubRegionArray:any=[];
public countryArray:any=[];
public countryDisp:any=[];
public countrySubRegiondisp:any=[];
public contact = '';

public regContactDatas:any=[];

//public countryDB:any;

constructor(public countryDB:CountryDbService, public apiService:ApiService){
  this.regContactInit();
  // console.log('this.countryDB',this.countryDB);
  this.countryRegion=this.countryDB.regions;
  this.countrySubRegionArray=this.countryDB.subRegion;
  this.countryArray=this.countryDB.countries;
    // console.log('this.countryRegion',this.countryRegion);
    // console.log('this.countrySubRegion',this.countrySubRegionArray);
    // console.log('this.countryArray',this.countryArray);
}

regContactInit(){
  this.regContactInfo.regions='Region';
  this.regContactInfo.subregions='Sub Region';
  this.regContactInfo.country='Country';
  this.regContactInfo.address="";
  this.regContactInfo.contact="";
  this.regContactInfo.phone="";
  this.regContactInfo.email="";
  this.regContactInfo.store="";

  this.ContactInfo.name="";
  this.ContactInfo.name="";
  this.ContactInfo.name="";
  this.ContactInfo.name="";
}

removeRegContactInfo(i:any){
   this.regContactDatas.splice(i, 1);
}

addRegContactInfo(){

if(this.regContactInfo.address=='' || this.regContactInfo.contact=="" || this.regContactInfo.phone==""){
  return 0;
}

   this.regContactDatas.push({
     region:this.regContactInfo.regions,
     subRegion:this.regContactInfo.subregions,
     country:this.regContactInfo.country,
     address:this.regContactInfo.address,
     contact:this.regContactInfo.contact,
     phone:this.regContactInfo.phone,
     email:this.regContactInfo.email,
     store:this.regContactInfo.store
   });

   this.regContactInfo.regions='Region';
   this.regContactInfo.subregions='Sub Region';
   this.regContactInfo.country='Country';
   this.regContactInfo.address="";
   this.regContactInfo.contact="";
   this.regContactInfo.phone="";
   this.regContactInfo.email="";
   this.regContactInfo.store="";

   $('html,body').animate({
         scrollTop: $("#regContactContainer").offset().top},
         'slow');
}

//function to store the contact information in a temporary array

SelectedRegion(selRegion:any){
  // console.log('selRegion',selRegion);

  this.countrySubRegiondisp=this.countrySubRegionArray[selRegion];
  // console.log('this.countrySubRegiondisp',this.countrySubRegiondisp);
}
SelectedSubRegion(selSubRegion:any){

  let subregExist=this.countryArray[this.regContactInfo.regions];
    // console.log('selSubRegion',selSubRegion,subregExist);

if(subregExist!='' && subregExist!=undefined){
    // console.log('countryDisp',this.countryArray[this.regContactInfo.regions][selSubRegion]);
  this.countryDisp=this.countryArray[this.regContactInfo.regions][selSubRegion];
}else{
    this.countryDisp=[];//this.countryArray['Region']['Sub Region'];
}

  // console.log('this.countryDisp',this.countryDisp);

}
store(){

    this.contactList.push(this.contact);
    this.contact = '';
}
//function to remove the contact information from temporary array
removeContact(i:number){
  //this.contactList=[];
   this.contactList.splice(i, 1);
}

//   constructor( public router: Router ){
//   super(router);
//
// }
   ngOnInit(){
       let parent:any=this;
     console.log('accountType',this.accountType);
     setTimeout(function(){
parent.getInfo();
parent.accountInfoView();

     },500);


   }
addmorePos(arg:string){
  if(arg=="plus"){
    this.addMore=this.addMore+1;
    setTimeout(function(){
      var objDiv = document.getElementById("add_more_scroll");
      objDiv.scrollTop = objDiv.scrollHeight;
     },500);

  }else{
    this.addMore=this.addMore-1;
  }

}

getInfo(){


  let parent:any=this;
   console.log('ApiURL',this.apiService.base);
  $.post(this.apiService.base+'Merchant/merchant_information',{
     'data':{
         'key':parent.apiKey,
         'filter':{
           'accountType':parent.accountType

         },
        /*  'extra':{
           'required': ['firstName','lastName','email','website','contactNumber']
         } */
     }
     },function(res:any){
       console.log('resUserInfo',res);
       if(res!=null){
         parent.userInformation=res.userInfo;
         parent.firstName = res.userInfo.firstName;
         parent.lastName = res.userInfo.lastName;
         parent.merchantMail = res.userInfo.email;
        }
     });
}



userInfoContact(item:any,assoc:any){
  if(this.userInfo.contact==undefined){ this.userInfo.contact={}; }
//  console.log(this.userInfo.contact[item]);
if(this.userInfo.contact[item]!=undefined){
  if( this.userInfo.contact[item][assoc] !=undefined ){
    return this.userInfo.contact[item][assoc];
  }else{ return ''; }

}else{
  return '';
}

}

maintainContactInfo(item:any,assoc:any,eve:any){
    if(this.userInfo.contact==undefined){ this.userInfo.contact={}; }
  if(this.userInfo.contact[item]==undefined){
    this.userInfo.contact[item]={};
     if( this.userInfo.contact[item][assoc] ==undefined ){
       this.userInfo.contact[item][assoc]='';
     }
  }
  this.userInfo.contact[item][assoc]=eve.target.value;
}
removeUserInfo(item:any){
  let contact:any=this.userInfo.contact;
//  console.log('Before Delete',contact);
  contact.splice(item,1); // parameter 1 : Position, parameter 2 : How many
//   console.log('After Delete',contact);
 this.userInfo.contact=contact;
}

updateUserInfo(){
let parent=this; //console.log(parent.userInfo);
let mFname:any    = document.getElementById('merchantFirstName');
let mLname:any    = document.getElementById('merchantLastName');
let mOffice:any  = document.getElementById('merchantOffice');
let mWebsite:any = document.getElementById('merchantWebsite');
let mContact:any = document.getElementById('merchantContact');
let mEmail:any   = document.getElementById('merchantEmail');
let mCompany:any  = document.getElementById('merchantCompanyName');
//Merchant regional contact info.
let mRegion1:any  = document.getElementById('merchantRegion-1');
let mContact1:any = document.getElementById('merchantContact-1');
let mAddress1:any = document.getElementById('merchantAddress-1');
let mContactNumber:any = document.getElementById('merchantContactNum-1');
let mRegionalEmail:any = document.getElementById('merchantRegEmail-1');
let storeLocator:any = document.getElementById('merchantStoreLocator');
var regionalContacts:any = [];
var regObj ={
  'contactPerson':mContact1.value,
  'address':mAddress1.value,
  'contactNumber':mContactNumber.value,
  'contactEmail':mRegionalEmail.value,
  'storeLocator':storeLocator.value,
  'regionalContacts':mRegion1.value
} ;
regionalContacts.push(regObj);
$.post(this.apiService.base+'merchant/merchant_information_edit',{
  'data':{
    'key':parent.apiKey,
    'form':{
      'firstName':mFname.value,
      'lastName':mLname.value,
      'website':mWebsite.value,
      'companyName':mCompany.value,
      'officeAddress': mOffice.value,
      'contactNumber':mContact.value,
      'email':mEmail.value,
      'regionalContacts': regionalContacts
    }
  },
},function(res:any){
  console.log(res);
  this.infoDetail=res;
  //  if(res.status=="failure"){
  //   parent.redirect('page-login',{});
  //  }else{
  //     if(res.status=="success"){
  //       parent.getInfo();
  //       swal("Success", "Successfully Updated", "success")
  //     }
  //  }
});
}

////////
///Extra


createRange(number:any){
  /* This method is equal to for(var i=0; i<=5; i++ ) // forloop
     In template just define  <div  *ngFor="let item of createRange(5)">
     Now Iteration will go upto 5 */

   this.primaryRange = [];
  for(var i = 1; i <= number; i++){
     this.primaryRange.push(i);
  }
  return this.primaryRange;
}

accountInfoView(){
  this.apiService.accountInfoView({
    data:{
      key:this.apiKey
    }
  }).then(res=>{
    // console.log('res',res);
    this.ContactInfoDisp=res.userInfo[0];
    console.log('res',this.ContactInfoDisp);
    if(this.ContactInfoDisp!='' && this.ContactInfoDisp!=null){

      this.ContactInfo.name=this.ContactInfoDisp.name;
      this.ContactInfo.desc=this.ContactInfoDisp.description;
      this.ContactInfo.officeAdd=this.ContactInfoDisp.officeAddress;
      this.ContactInfo.weburl=this.ContactInfoDisp.websiteUrl;
      this.contactList=this.ContactInfoDisp.contactNumber;
      this.ContactInfo.email=this.ContactInfoDisp.email;
      this.regContactDatas=this.ContactInfoDisp.regionalContactInfo;
    }

  }).catch(err=>{
    console.log("Unable to get profile information !",err);
  });
}

// accountInfoView(){
//   let parent:any=this;
//   $.post(this.apiService.base+'users/account_info',{
//     'data':{
//       'key':parent.apiKey,
//     }
//       },function(res:any){
//         console.log('res',res);
//
//       });
// }



saveDetails(){

  if(this.regContactDatas.length>0){
    console.log('1');
  }else{
    this.addRegContactInfo();
    console.log('2');
  }

  this.apiService.accountInfoAdd({
    data:{
      key:this.apiKey,
      form:{
        name    :this.ContactInfo.name,
        description:this.ContactInfo.desc,
        websiteUrl  :this.ContactInfo.weburl,
        officeAddress  : this.ContactInfo.officeAdd,
        contactNumber   : this.contactList,
        email   : this.ContactInfo.email,
        regionalContactInfo :this.regContactDatas
     }
    }
  }).then(res=>{
    // console.log('res',res);
    if(res.status=="success"){
    swal("Success", "Successfully Updated", "success")
      setTimeout( function(){ swal.close();}, 2000);
    }


  }).catch(err=>{
    console.log("Unable to update profile information !",err);
  });
}

updateDetails(){
  // console.log('updateDetails');
  this.apiService.accountInfoEdit({
    data:{
      key:this.apiKey,
      form:{
        name    :this.ContactInfo.name,
        description:this.ContactInfo.desc,
        websiteUrl  :this.ContactInfo.weburl,
        officeAddress  : this.ContactInfo.officeAdd,
        contactNumber   : this.contactList,
        email   : this.ContactInfo.email,
        regionalContactInfo :this.regContactDatas
     }
    }
  }).then(res=>{
    // console.log('res',res);
    if(res.status=="success"){
    swal("Success", "Successfully Updated", "success")
      setTimeout( function(){ swal.close();}, 2000);
    }

  }).catch(err=>{
    console.log("Unable to update profile information !",err);
  });


}
//function for number validation
CheckIntVal(event:any) {
          event.srcElement.value=event.srcElement.value.replace(/[^\d].+/, "");

           if(event.srcElement.value!='')
           {
            //  console.log('t',event.srcElement.value);
           if ((event.which < 48 || event.which > 57)) {
               event.preventDefault();
           }
         }else{
          // event.srcElement.value=0;
         }

}


}

//  return this.primaryRange;
