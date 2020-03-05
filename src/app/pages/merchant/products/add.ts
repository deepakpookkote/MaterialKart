import { Component,style, state, animate, transition, trigger,
     ElementRef, AfterViewInit,  OnDestroy, ViewChild,ChangeDetectorRef
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../../app.component';
  import { Location } from '@angular/common';

import { globalService } from './../../../services/global.service';
import { ApiService } from './../../../services/ApiService';
import { RatingsService }from './../../../services/ratings/ratings.service'

declare var swal :any;
declare var $:any;
@Component({
  styles:[`
       .parameter-table tr th{
         background-color:white;
       }
       .parameter-table tr th,.parameter-table tr td{
         border: 1px solid #a8a3a3;
       }
       .min-width-200{
         min-width:88px!important;
       }

       .image-input{
         border: none;
         box-shadow: none;
       }
       .bgBlack{
         background: #000000;
         padding:8px;
       }
       .bgBlack:hover {
         background: #000000;
         cursor: pointer;
       }
       .dropdownLabel {
         font-size:15.5px !important;
       }

       .error{
         color:red;
       }
       .rotate:hover{
          color: red;
          transition: 0.9s;
          transform: rotateY(180deg);
      }
      .alert-info {
        color: #31708f;
        background: none;
        border: none;
      }
    `],
  templateUrl: './app/pages/merchant/products/add.template.html' ,

})
export class MerchantProductAdd extends AppComponent  {

  // public addMore:number=1;
    public apiKey:any=localStorage.getItem('GBCItoken');

    // public primaryRange:any=[];
    // public parameterCodes:any=[];
    // public LEEDV4EBOM_parameterCodes:any=[];
    // public LEEDV4BDID_parameterCodes:any=[];
    // public selectedCategory:any;
    // public dynamicParameters:any = [];
    public productImage1 =  "../../webroot/images/general/file-upload.jpg";
    public productImage2 =  "../../webroot/images/general/file-upload.jpg";
    public productImage3 =  "../../webroot/images/general/file-upload.jpg";
     public successMessage = false;
    // public failureMessage = false;
    // public noParamInfo = true;
    public productCategory:any = "";
    private addParameter:boolean=true;

    private parameterCategCheckbox:any = { };


    //Newly added instances for fetching data from Json
    public RatingArray:any=[];
    public CategoryArray:any=[];
    public carArr:any=[];  public catArr:any;
    public primaryRange:any;
    public ParametersArray:any=[];
    public parameterList:any=[];
    public parameterTitle:any=[];
    public prdRating:string='';
    public prdCategory:string='';
    public prdParameters:string='';
    public subMenuArray:any=[];
    public commentsArray:any[];
    public ratingCategories: any;
    public parametersExplorer: any;
    public thresholdsLists: any;
    public parameterCollections:any=[];
    public productInformationYES:string="";
    public additionalInformation:boolean=false;
    public additionalInformationAry:any = {};
    public prdRecords:any=[];
    public parameters:any=[];
    public ratingCategoriesArray:any=[];


    public input_parameter:any={};
    public submenu1:any=[];
    public formErrors:any=[];
    public textValues:any;
    public categoriesList:any;
    public resultCategory:any;
    public resultCategoryToArray:any;
    public parameterArrayList:any=[];

    public userInput:any={};




    constructor( public router: Router ,
      public globalService: globalService,
      public apiService:ApiService,
      public _location:Location,
      public ratingsService:RatingsService,
      private cdRef:ChangeDetectorRef
    ){
       super(router,globalService,apiService);
       this.ratingCategories=(ratingsService.ratingCategories);
       this.ratingCategoriesArray=this.toArrayKeyValue(this.ratingsService.ratingCategories);
       this.parametersExplorer = ratingsService.parametersExplorer;
       this.parameters= this.toArrayKeyValue(this.ratingsService.parametersExplorer);
       this.thresholdsLists = ratingsService.thresholds;

       this.prdRecords.productName='';
       this.prdRecords.manufactLocation='';
       this.prdRecords.productDescription='';
       this.prdRecords.websiteUrl='';
       this.ApiURL=this.apiService.base;


     }





   ngOnInit(){

   }


   addSubmenu1(category:string,val:string){//function to fetch the added parameters

     if(this.input_parameter[category]==undefined){
       this.input_parameter[category]={};
      }
     this.input_parameter[category]['submenu1']=val;
   }

   addEntryField(category:string,val:string){//function to fetch the added parameters

     if(this.input_parameter[category]==undefined){
       this.input_parameter[category]={};
      }
     this.input_parameter[category]['entryField']=val;

   }

   addDocumentUrl(category:string,val:string){//function to fetch the added parameters

     if(this.input_parameter[category]==undefined){
       this.input_parameter[category]={};
      }
     this.input_parameter[category]['documentUrl']=val;

   }



   addSubmenu2(category:string,subItem2:string,val:string){//function to fetch the added parameters

     if(this.input_parameter[category]==undefined){
       this.input_parameter[category]={};
      }
      if(this.input_parameter[category]['submenu2']==undefined){
        this.input_parameter[category]['submenu2']={};
       }


     this.input_parameter[category]['submenu2'][subItem2]=val;

   }

   resetCategory(category:string){
     delete this.input_parameter[category];
   }

   productparametersValues(category:string,submenu1:string){
      if(this.userInput[category]!=undefined){
        this.userInput[category]['submenu1']=submenu1;
      } else{
        this.userInput[category]={};
        this.userInput[category]['submenu1']=submenu1;
      }

   }
   //
  //  public dispIndex:any=0;
  //  assighDispIndex(indxVal:any){
  //    this.dispIndex=indxVal;
  //  }

   PrintIndex(index:any){
     console.log('index',index);
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



   goback(){
        this._location.back();
    }

     changingParameters(){

      $('#productCategory').val('');
      $('.productParameters').val('');

     }

     selectedOption(){
       $("#productCategory").change(function () {
           if ($(this).val() == "YES") {
               $("#informationDiv").show();
           } else {
               $("#informationDiv").hide();
           }
       });
     }





//------ Extra --------



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

   readUrl(event:any,prod:any) {
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
         reader.onload = (event:any) => {
           if(prod == 'image1') this.productImage1 = event.target.result;
           else if(prod == 'image2') this.productImage2 = event.target.result;
           else this.productImage3 = event.target.result;
         }
         reader.readAsDataURL(event.target.files[0]);
       }
   }

   //
   // inputcollect(arg1:any,arg2:any){
   //   console.log('values',arg1,arg2);
   // }




addProduct(){


this.formErrors=[];

if(this.prdRecords.productName=='')
  this.formErrors.push('Name field must.');
if(this.prdCategory=='')
  this.formErrors.push('Category field must.');
if(this.prdRecords.manufactLocation=='')
  this.formErrors.push('Manufacturer Location field must.');
if(this.prdRecords.productDescription=='')
  this.formErrors.push('Product description field must.');
if(this.prdRecords.websiteUrl=='')
  this.formErrors.push('Website URL field must.');

if(this.formErrors.length>0){
  return 0;
}
let params = JSON.parse( JSON.stringify( this.input_parameter ) );


  this.apiService.merchantProductAdd({

    data:{
      key:this.apiKey,
      form:{
        name    :this.prdRecords.productName,
        category:this.prdCategory,
        status  :'hold',
        manufactureLocation: this.prdRecords.manufactLocation,
        description  : this.prdRecords.productDescription,
        websiteUrl   : this.prdRecords.websiteUrl,
        v2parameters   : params
     }
  }
}).then(res=>{
      if(res.status=='success'){

this.successMessage=true;
        let parent=this;
        let productId=res.productId;

        if($('#image1')[0].files[0]){
          var formData = new FormData();
          formData.append('key',  this.apiKey );
          formData.append('productId', productId );
          formData.append('imageCategory','productImage');
          formData.append('image1', $('#image1')[0].files[0] );
          //console.log(formData);
          $.ajax({
            url: this.ApiURL+'images/push',//'upload.php',
            type: 'POST', data: formData,   // Tell jQuery not to process data or worry about content-type
           cache: false, contentType: false,  processData: false, // You *must* include these options!
           complete:function(res:any){

              let resp= (res.responseText);
             res=  ( resp.substring(resp.lastIndexOf('"status":"')+10,resp.lastIndexOf('","reference"')) );   /// eval("(" + res.responseText + ")");

             if(res=="success"){
               parent.productImage1 =  "../../webroot/images/general/cloud_uploaded.jpg";

               if($('#image2')[0].files[0]){
                 var formData2 = new FormData();
                 formData2.append('key',  parent.apiKey );
                 formData2.append('productId', productId );
                 formData2.append('imageCategory','productImage');
               formData2.append('image2', $('#image2')[0].files[0] );
               //console.log(formData);
               $.ajax({
                 url: parent.ApiURL+'images/push',//'upload.php',
                 type: 'POST', data: formData2,   // Tell jQuery not to process data or worry about content-type
                cache: false, contentType: false,  processData: false, // You *must* include these options!
                complete:function(res:any){
                   // console.log(res);
                  //   console.log('Image 02',res);
                     let resp= (res.responseText);
                    res=  ( resp.substring(resp.lastIndexOf('"status":"')+10,resp.lastIndexOf('","reference"')) );   /// eval("(" + res.responseText + ")");

                    if(res=="success"){
                      parent.productImage2 =  "../../webroot/images/general/cloud_uploaded.jpg";

                    if($('#image3')[0].files[0]){
                      var formData3 = new FormData();
                      formData3.append('key',  parent.apiKey );
                      formData3.append('productId', productId );
                      formData3.append('imageCategory','productImage');
                      formData3.append('image3', $('#image3')[0].files[0] );
                    //console.log(formData);
                    $.ajax({
                      url: parent.ApiURL+'images/push',//'upload.php',
                      type: 'POST', data: formData3,   // Tell jQuery not to process data or worry about content-type
                     cache: false, contentType: false,  processData: false, // You *must* include these options!
                     complete:function(res:any){

                    //   console.log('Image 03',res);
                       let resp= (res.responseText);
                      res=  ( resp.substring(resp.lastIndexOf('"status":"')+10,resp.lastIndexOf('","reference"')) );   /// eval("(" + res.responseText + ")");
                      if(res=="success"){

                        parent.productImage3 =  "../../webroot/images/general/cloud_uploaded.jpg";
                        swal("Success", "Successfully Updated", "success");parent.successMessage=false;

                      }else{
                        swal("Failure", "unable to upload Image", "warning");parent.successMessage=false;
                      }

                     }
                    });
                  }else{
                    swal("Success", "Successfully Updated", "success");parent.successMessage=false;
                  }

               }else{
                 swal("Failure", "unable to upload Image", "warning");parent.successMessage=false;
               }

                }
               });
             }else{
               swal("Success", "Successfully Updated", "success");parent.successMessage=false;

             }



           }else{
             swal("Failure", "unable to upload Image", "warning");parent.successMessage=false;
           }
           }
          });
      }else{
        swal("Success", "Successfully Updated", "success");parent.successMessage=false;

      }








      this.prdRecords.productName="";
      this.prdCategory="";
      this.prdRecords.manufactLocation="";
      this.prdRecords.productDescription="";
      this.prdRecords.websiteUrl="";
      this.input_parameter={};






      }
  }).catch(err=>{
    console.log( 'Error while uploading Product !',err );
  });
}



 }
