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
body{
  background-color:#eaebec;
}
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
      font-size: 16px;
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
      color: #fff;
    }

    .login-container {
    /*  background: #ebebeb; */
    background-image:url(./webroot/images/transparent-60.png);
      padding: 12px;
      border: 1px solid silver;
    }

    /* Every row inside .login-container is defined with p tags */
    .login p {
      padding: 5px;
    }

    .login input, .login .submit {
      box-sizing: border-box;
      display: block;
      width: 100%;
      border-width: 1px;
      border-style: solid;
      padding: 5px; border-radiu: 3px;
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
      cursor: pointer;
    }

    .login .submit:hover {
      background: #556b7d;/*#17c;*/
    }

    /* Buttons' focus effect */
    .login .submit:focus {
      border-color: #05a;
    }



    input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}


    `],
  templateUrl: './app/pages/users/register.template.html' ,
})
export class MerchantRegisterComponent extends AppComponent  {
  public products:any;

  public errFN:any;public errLN:any;public errCNO:any;public errEMl:any;
     public errPwd:any;public errACTy:any;public Noerr:any="0";

  public captchaToken:any;
//   constructor( public router: Router ){
//   super(router);
//
// }


 constructor( public router: Router , public globalService: globalService){
     super(router,globalService);
    window['verifyCallback'] = this.verifyCallback.bind(this);
  }


   ngOnInit(){
     this.displayRecaptcha();
     setTimeout(function(){
       $("body").css({
         "background-image":"url(./webroot/images/stock-images/login-register-bg.jpg)",
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
      let firstname:any=document.getElementById('fname');
      let lastname:any=document.getElementById('lname');
      let company:any=document.getElementById('company');
      let contact:any=document.getElementById('contact');
      let email:any=document.getElementById('email');
      let password:any=document.getElementById('password');
      let AcctType:any=document.getElementById('selAccType');
      parent.Noerr="0";

      //process starts from here
       error.innerHTML="";
       if(firstname.value==''){
         parent.errFN="1";parent.Noerr="1";
       }else{parent.errFN="0";}

       if(lastname.value==''){
         parent.errLN="1";parent.Noerr="1";
       }else{parent.errLN="0";}

       if(contact.value==''){
         parent.errCNO="1";parent.Noerr="1";
       }else{parent.errCNO="0";}

       if(!parent.validateNumber(contact.value)){
         parent.errCNO="2";parent.Noerr="1";
       }

       if(email.value==''){
         parent.errEMl="1";parent.Noerr="1";
       }else if(!parent.validateEmail(email.value)){
             parent.errEMl="2";parent.Noerr="1";

       }else{parent.errEMl="0";}

       if(password.value==''){
         parent.errPwd="1";parent.Noerr="1";
       }else{parent.errPwd="0";}

       if(AcctType.value==''){
         parent.errACTy="1";parent.Noerr="1";
       }else{parent.errACTy="0";}


      //  if(!parent.validateSpecialCharacter(contact.value)){
      //    //error.innerHTML="<div class='alert alert-danger'>! Special Characters not allowed in Contact Number</div>";
      //    parent.errCNO="2"
      //    return false;
      //  }
      //  if(!parent.validateNumber(contact.value)){
      //     parent.errCNO="3"
      //    //error.innerHTML="<div class='alert alert-danger'>! Only Numbers allowed in Contact Number  </div>";
      //    return false;
      //  }





      // if(lastname.value==''|| contact.value=='' || password.value=='' || AcctType.value==''){
      //   error.innerHTML="<div class='alert alert-danger'>! All the fields are must</div>";
      //   return false;
      // }


if(parent.Noerr=='0'){
button.innerHTML="<i class='fa fa-spinner fa-spin fa-fw'></i> Submit ";


if(AcctType.value=="merchant"){
  $.post(this.ApiURL+'merchant/merchantregister',{
    'data':{
      'captchaToken':parent.captchaToken,
      'firstName':firstname.value,
      'lastName':lastname.value,
      'company':company.value,
      'contact':contact.value,
      'email':email.value,
      'password':password.value
    }
  },function(res:any){
  //  console.log('Response',res);
   button.innerHTML='<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
     if(res.status=="failure"){

       error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> "+res.message+"</div>";
       document.getElementById("re_captcha").innerHTML="";
       parent. displayRecaptcha();
     }else{
       error.innerHTML="";
       error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";

       setTimeout(function(){
      parent.redirect('page-login',{});
       },2000);

     }
  });

}else if(AcctType.value=="user"){
  $.post(this.ApiURL+'users/userregister',{
    'data':{
      'captchaToken':parent.captchaToken,
      'firstName':firstname.value,
      'lastName':lastname.value,
      'company':company.value,
      'contact':contact.value,
      'email':email.value,
      'password':password.value
    }
  },function(res:any){
  //  console.log('Response',res);
   button.innerHTML='<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
     if(res.status=="failure"){
      error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> "+res.message+"</div>";
       document.getElementById("re_captcha").innerHTML="";
       parent. displayRecaptcha();
     }else{
       error.innerHTML="";
       error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";

       setTimeout(function(){
      parent.redirect('page-login',{});
       },2000);

     }
  });

}else if(AcctType.value=="gbcistaff"){
  $.post(this.ApiURL+'users/gbcistaffregister',{
    'data':{
      'captchaToken':parent.captchaToken,
      'firstName':firstname.value,
      'lastName':lastname.value,
      'company':company.value,
      'contact':contact.value,
      'email':email.value,
      'password':password.value
    }
  },function(res:any){
  //  console.log('Response',res);
   button.innerHTML='<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
     if(res.status=="failure"){
      error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> "+res.message+"</div>";
       document.getElementById("re_captcha").innerHTML="";
       parent. displayRecaptcha();
     }else{
       error.innerHTML="";
       error.innerHTML="<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";

       setTimeout(function(){
      parent.redirect('page-login',{});
       },2000);


     }
  });

}

}//check for no error

      //console.log('OnSubmit',this.captchaToken);
    }//Submit



 }
