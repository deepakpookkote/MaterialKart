"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_component_1 = require("./../../app.component");
var global_service_1 = require("./../../services/global.service");
var MerchantLoginComponent = (function (_super) {
    __extends(MerchantLoginComponent, _super);
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    function MerchantLoginComponent(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.Noerr = "0";
        window['verifyCallback'] = _this.verifyCallback.bind(_this);
        return _this;
    }
    MerchantLoginComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
        this.displayRecaptcha();
        setTimeout(function () {
            $("body").css({
                // "background-image":"url(./webroot/images/stock-images/login-register-bg.jpg)",
                "background-image": "url(./webroot/images/landing-page/GBCI-3.jpg)",
                "background-size": "100%"
            });
        }, 100);
    };
    MerchantLoginComponent.prototype.displayRecaptcha = function () {
        var doc = document.getElementById('merchant_signup_form');
        var script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    };
    MerchantLoginComponent.prototype.verifyCallback = function (response) {
        this.captchaToken = response;
        //  console.log(response);
    };
    MerchantLoginComponent.prototype.merchantSubmit = function () {
        var parent = this;
        var error = document.getElementById('error');
        var button = document.getElementById('merchantbutton');
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        //  let accounttype:any=document.getElementById('selAccType');
        //process starts from here
        error.innerHTML = "";
        parent.Noerr = "0";
        // if(!parent.validateEmail(email.value)){
        //   error.innerHTML="<div class='alert alert-danger'>! Not a valid Email ID</div>";
        //   return false;
        // }
        //
        // if( email.value=='' || password.value=='' ){
        //   error.innerHTML="<div class='alert alert-danger'>! All the fields are must</div>";
        //   return false;
        // }
        if (email.value == '') {
            parent.errEMl = "1";
            parent.Noerr = "1";
        }
        else if (!parent.validateEmail(email.value)) {
            parent.errEMl = "2";
            parent.Noerr = "1";
        }
        else {
            parent.errEMl = "0";
        }
        if (password.value == '') {
            parent.errPwd = "1";
            parent.Noerr = "1";
        }
        else {
            parent.errPwd = "0";
        }
        //  if(accounttype.value==''){
        //    parent.errACTy="1";parent.Noerr="1";
        //  }else{parent.errACTy="0";}
        if (parent.Noerr == '0') {
            button.innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Submit ";
            $.post(this.ApiURL + 'api/authenticate', {
                'data': {
                    'email': email.value,
                    'password': password.value,
                }
            }, function (res) {
                //  console.log('Response',res);
                button.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
                if (res.status == "success") {
                    error.innerHTML = "";
                    localStorage.setItem('GBCItoken', res.key);
                    localStorage.setItem('GBCIaccountType', res.accountType);
                    localStorage.setItem('GBCIRole', res.role);
                    // parent.redirect('page-merchant-dashboard',{});
                    //  parent.redirect('page-product',{});
                    var searchObjectAvailable = parent.globalService.getData().productSearch;
                    if (searchObjectAvailable != "" && searchObjectAvailable != undefined) {
                        parent.redirect('page-listing', {});
                    }
                    else {
                        parent.redirect('page-landing', {});
                    }
                }
                else {
                    error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> Authentication Failed !</div>";
                    //error.innerHTML="<div class='alert alert-danger'>! Authentication Failed </div>";
                    document.getElementById("re_captcha").innerHTML = "";
                    parent.displayRecaptcha();
                }
            }).done(function () {
                //alert( "second success" );
            })
                .fail(function () {
                //alert( "error" );
                button.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
                //error.innerHTML="<div class='alert alert-danger'>! Authentication Failed </div>";
                error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> Authentication Failed !</div>";
                document.getElementById("re_captcha").innerHTML = "";
                parent.displayRecaptcha();
            })
                .always(function () {
                //alert( "finished" );
            });
        } //no error
        //console.log('OnSubmit',this.captchaToken);
    };
    MerchantLoginComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\n\n.header-content{\n  text-shadow: 0 0 5px white;\n  background-image:url(./webroot/images/trans.png);\n  padding:5px;\n  border-radius: 5px;\n  height: 100% !important;\n    background-position: center !important;\n    background-repeat: no-repeat !important;\n    background-size: cover !important;\n}\n\n    .login {\n      width: 400px;\n      margin: 16px auto;\n      font-size: 17px;\n    }\n\n    /* Reset top and bottom margins from certain elements */\n    .login-header,\n    .login p {\n      margin-top: 0;\n      margin-bottom: 0;\n\n    }\n\n    /* The triangle form is achieved by a CSS hack */\n    .login-triangle {\n      width: 0;\n      margin-right: auto;\n      margin-left: auto;\n      border: 12px solid transparent;\n      border-bottom-color: #4a5d6c; /*#28d;*/\n    }\n\n    .login-header {\n      background: #4a5d6c; /*#28d;*/\n      padding: 20px;\n      font-size: 1.4em;\n      font-weight: normal;\n      text-align: center;\n      text-transform: uppercase;\n      color: #fff !important;\n    }\n\n    .login-container {\n    /*  background: #ebebeb; */\n    background-image:url(./webroot/images/transparent-90.png);\n      padding: 12px;\n      border: 1px solid silver;\n    }\n\n    /* Every row inside .login-container is defined with p tags */\n    .login p {\n      padding: 2px;\n      font-size: 17px;\n    }\n\n    .login input, .login .submit {\n      box-sizing: border-box;\n      display: block;\n      width: 100%;\n      border-width: 1px;\n      border-style: solid;\n      padding: 5px;border-radius: 4px;\n      outline: 0;\n\n      font-size: 0.95em;\n    }\n\n    .login input,\n    .login input[type=\"password\"] {\n      background: #fff;\n      border-color: #bbb;\n      color: #555;\n    }\n\n    /* Text fields' focus effect */\n    .login input:focus {\n      border-color: #888;\n    }\n\n    .login .submit {\n      background: #4a5d6c;/*#28d;*/\n      border-color: transparent;\n      color: #fff;\n      font-size: 17px;\n      cursor: pointer;\n    }\n\n    .login .submit:hover {\n      background: #556b7d;/*#17c;*/\n    }\n\n    /* Buttons' focus effect */\n    .login .submit:focus {\n      border-color: #05a;\n    }\n\n\n  .panel-leed-cover{\n    background-image:url(./webroot/images/ratings-images/leed.jpg);\n  }\n  .panel-sites-cover{\n    background-image:url(./webroot/images/ratings-images/sites-swaner.jpg);\n  }\n  .panel-peer-cover{\n    background-image:url(./webroot/images/ratings-images/peer-powerlines.jpg);\n  }\n  .panel-well-cover{\n    background-image:url(./webroot/images/ratings-images/well-hallway.jpg);\n  }\n  .panel-edge-cover{\n    background-image:url(./webroot/images/ratings-images/edge-buildings.jpg);\n  }\n  .panel-gresb-cover{\n    background-image:url(./webroot/images/ratings-images/gresb-buildings.jpg);\n  }\n  .panel-parksmart-cover{\n    background-image:url(./webroot/images/ratings-images/parksmart.jpg);\n  }\n  .panel-zero-waste-cover{\n    background-image:url(./webroot/images/ratings-images/zero-waste.jpg);\n  }\n  @media only screen and (max-width: 768px) {\n    .ratings-list {\n      height: 600px !important;\n    }\n  }\n  @media only screen and (max-width: 768px) {\n    .copy.three-quart.left.image-right.v-center-wrapper, .copy.three-quart.right.v-center-wrapper {\n      display: block;\n    }\n  }\n  .image{\n    height:100%;\n    background-color: transparent;\n    background-repeat: no-repeat;\n    background-position: center top;\n    background-size: cover;\n  }\n  .inner{\n    height: 100%;\n   /* background: #4a5d6c;\n    color: white;*/\n    padding: 3%;\n    line-height: 3;\n    letter-spacing: 1px;\n  }\n  .inner hr{\n    width: 40%;\n    border-color: #4a5d6c;\n  }\n\n    "],
            templateUrl: './app/pages/users/login.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], MerchantLoginComponent);
    return MerchantLoginComponent;
}(app_component_1.AppComponent));
exports.MerchantLoginComponent = MerchantLoginComponent;
