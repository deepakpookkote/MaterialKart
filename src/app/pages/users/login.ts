import { Component,style, state, animate, transition, trigger,
     ElementRef,
     AfterViewInit,
     OnDestroy,
     ViewChild,
 } from '@angular/core';
  import { RouterModule, Routes, Router } from '@angular/router';
import { AppComponent } from './../../app.component';
import { globalService } from './../../services/global.service';
declare var $:any;

@Component({
  //selector: 'my-app',
  styles:[`

.header-content{
  text-shadow: 0 0 5px white;
  background-image:url(./webroot/images/trans.png);
  padding:5px;
  border-radius: 5px;
  height: 100% !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
}

    .login {
      width: 400px;
      margin: 16px auto;
      font-size: 17px;
    }

    /* Reset top and bottom margins from certain elements */
    .login-header,
    .login p {
      margin-top: 0;
      margin-bottom: 0;

    }

    /* The triangle form is achieved by a CSS hack */
    .login-triangle {
      width: 0;
      margin-right: auto;
      margin-left: auto;
      border: 12px solid transparent;
      border-bottom-color: #4a5d6c; /*#28d;*/
    }

    .login-header {
      background: #4a5d6c; /*#28d;*/
      padding: 20px;
      font-size: 1.4em;
      font-weight: normal;
      text-align: center;
      text-transform: uppercase;
      color: #fff !important;
    }

    .login-container {
    /*  background: #ebebeb; */
    background-image:url(./webroot/images/transparent-90.png);
      padding: 12px;
      border: 1px solid silver;
    }

    /* Every row inside .login-container is defined with p tags */
    .login p {
      padding: 2px;
      font-size: 17px;
    }

    .login input, .login .submit {
      box-sizing: border-box;
      display: block;
      width: 100%;
      border-width: 1px;
      border-style: solid;
      padding: 5px;border-radius: 4px;
      outline: 0;

      font-size: 0.95em;
    }

    .login input,
    .login input[type="password"] {
      background: #fff;
      border-color: #bbb;
      color: #555;
    }

    /* Text fields' focus effect */
    .login input:focus {
      border-color: #888;
    }

    .login .submit {
      background: #4a5d6c;/*#28d;*/
      border-color: transparent;
      color: #fff;
      font-size: 17px;
      cursor: pointer;
    }

    .login .submit:hover {
      background: #556b7d;/*#17c;*/
    }

    /* Buttons' focus effect */
    .login .submit:focus {
      border-color: #05a;
    }


  .panel-leed-cover{
    background-image:url(./webroot/images/ratings-images/leed.jpg);
  }
  .panel-sites-cover{
    background-image:url(./webroot/images/ratings-images/sites-swaner.jpg);
  }
  .panel-peer-cover{
    background-image:url(./webroot/images/ratings-images/peer-powerlines.jpg);
  }
  .panel-well-cover{
    background-image:url(./webroot/images/ratings-images/well-hallway.jpg);
  }
  .panel-edge-cover{
    background-image:url(./webroot/images/ratings-images/edge-buildings.jpg);
  }
  .panel-gresb-cover{
    background-image:url(./webroot/images/ratings-images/gresb-buildings.jpg);
  }
  .panel-parksmart-cover{
    background-image:url(./webroot/images/ratings-images/parksmart.jpg);
  }
  .panel-zero-waste-cover{
    background-image:url(./webroot/images/ratings-images/zero-waste.jpg);
  }
  @media only screen and (max-width: 768px) {
    .ratings-list {
      height: 600px !important;
    }
  }
  @media only screen and (max-width: 768px) {
    .copy.three-quart.left.image-right.v-center-wrapper, .copy.three-quart.right.v-center-wrapper {
      display: block;
    }
  }
  .image{
    height:100%;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: cover;
  }
  .inner{
    height: 100%;
   /* background: #4a5d6c;
    color: white;*/
    padding: 3%;
    line-height: 3;
    letter-spacing: 1px;
  }
  .inner hr{
    width: 40%;
    border-color: #4a5d6c;
  }

    `],
  templateUrl: './app/pages/users/login.template.html' ,
})
export class MerchantLoginComponent extends AppComponent  {
  public products:any;

  public captchaToken:any;
  public errEMl:any;public errPwd:any;public Noerr:any="0";
//   constructor( public router: Router ){
//   super(router);
//
// }


constructor( public router: Router , public globalService: globalService){
    super(router,globalService);
   window['verifyCallback'] = this.verifyCallback.bind(this);
 }




   ngOnInit(){
     this.scrollToRatings();
     this.displayRecaptcha();
    setTimeout(function(){
      $("body").css({
        // "background-image":"url(./webroot/images/stock-images/login-register-bg.jpg)",
         "background-image":"url(./webroot/images/landing-page/GBCI-3.jpg)",
        "background-size":"100%"
      });
    },100);
   }


   displayRecaptcha(){
      var doc = <HTMLDivElement>document.getElementById('merchant_signup_form');
      var script = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      doc.appendChild(script);
    }

    verifyCallback( response: any){
      this.captchaToken=response;
    //  console.log(response);
    }

    merchantSubmit(){
         let parent:any=this;

         let error:any=document.getElementById('error');
         let button:any=document.getElementById('merchantbutton');

         let email:any=document.getElementById('email');
         let password:any=document.getElementById('password');
        //  let accounttype:any=document.getElementById('selAccType');

         //process starts from here
          error.innerHTML="";
          parent.Noerr="0";



         // if(!parent.validateEmail(email.value)){
         //   error.innerHTML="<div class='alert alert-danger'>! Not a valid Email ID</div>";
         //   return false;
         // }
         //
         // if( email.value=='' || password.value=='' ){
         //   error.innerHTML="<div class='alert alert-danger'>! All the fields are must</div>";
         //   return false;
         // }
         if(email.value==''){
           parent.errEMl="1";parent.Noerr="1";
         }else if(!parent.validateEmail(email.value)){
               parent.errEMl="2";parent.Noerr="1";

         }else{parent.errEMl="0";}

         if(password.value==''){
           parent.errPwd="1";parent.Noerr="1";
         }else{parent.errPwd="0";}

        //  if(accounttype.value==''){
        //    parent.errACTy="1";parent.Noerr="1";
        //  }else{parent.errACTy="0";}
   if(parent.Noerr=='0'){
         button.innerHTML="<i class='fa fa-spinner fa-spin fa-fw'></i> Submit ";

         $.post(this.ApiURL+'api/authenticate',{
           'data':{
             'email':email.value,
             'password':password.value,
            //  'accountType':accounttype.value,
            //  'captchaToken':parent.captchaToken
           }
         },function(res:any){
         //  console.log('Response',res);
          button.innerHTML='<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
            if(res.status=="success"){
              error.innerHTML="";
              localStorage.setItem('GBCItoken',res.key);
              localStorage.setItem('GBCIaccountType',res.accountType);
              localStorage.setItem('GBCIRole',res.role);
             // parent.redirect('page-merchant-dashboard',{});
           //  parent.redirect('page-product',{});

              var searchObjectAvailable=parent.globalService.getData().productSearch;
              if(searchObjectAvailable!="" && searchObjectAvailable!=undefined){
                 parent.redirect('page-listing',{});
              }else{
             parent.redirect('page-landing',{});
           }


            }else{
              error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> Authentication Failed !</div>";
              //error.innerHTML="<div class='alert alert-danger'>! Authentication Failed </div>";
              document.getElementById("re_captcha").innerHTML="";
              parent. displayRecaptcha();
            }
         }).done(function() {
             //alert( "second success" );
           })
           .fail(function() {
             //alert( "error" );
             button.innerHTML='<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
             //error.innerHTML="<div class='alert alert-danger'>! Authentication Failed </div>";
             error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> Authentication Failed !</div>";
             document.getElementById("re_captcha").innerHTML="";
             parent. displayRecaptcha();
           })
           .always(function() {
             //alert( "finished" );
           });
         }//no error
         //console.log('OnSubmit',this.captchaToken);
       }


 }
