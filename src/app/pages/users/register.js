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
var MerchantRegisterComponent = (function (_super) {
    __extends(MerchantRegisterComponent, _super);
    //   constructor( public router: Router ){
    //   super(router);
    //
    // }
    function MerchantRegisterComponent(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.Noerr = "0";
        window['verifyCallback'] = _this.verifyCallback.bind(_this);
        return _this;
    }
    MerchantRegisterComponent.prototype.ngOnInit = function () {
        this.displayRecaptcha();
        setTimeout(function () {
            $("body").css({
                "background-image": "url(./webroot/images/stock-images/login-register-bg.jpg)",
                "background-size": "100%"
            });
        }, 100);
    };
    MerchantRegisterComponent.prototype.displayRecaptcha = function () {
        var doc = document.getElementById('merchant_signup_form');
        var script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    };
    MerchantRegisterComponent.prototype.verifyCallback = function (response) {
        this.captchaToken = response;
        //  console.log(response);
    };
    MerchantRegisterComponent.prototype.merchantSubmit = function () {
        var parent = this;
        var error = document.getElementById('error');
        var button = document.getElementById('merchantbutton');
        var firstname = document.getElementById('fname');
        var lastname = document.getElementById('lname');
        var company = document.getElementById('company');
        var contact = document.getElementById('contact');
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var AcctType = document.getElementById('selAccType');
        parent.Noerr = "0";
        //process starts from here
        error.innerHTML = "";
        if (firstname.value == '') {
            parent.errFN = "1";
            parent.Noerr = "1";
        }
        else {
            parent.errFN = "0";
        }
        if (lastname.value == '') {
            parent.errLN = "1";
            parent.Noerr = "1";
        }
        else {
            parent.errLN = "0";
        }
        if (contact.value == '') {
            parent.errCNO = "1";
            parent.Noerr = "1";
        }
        else {
            parent.errCNO = "0";
        }
        if (!parent.validateNumber(contact.value)) {
            parent.errCNO = "2";
            parent.Noerr = "1";
        }
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
        if (AcctType.value == '') {
            parent.errACTy = "1";
            parent.Noerr = "1";
        }
        else {
            parent.errACTy = "0";
        }
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
        if (parent.Noerr == '0') {
            button.innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> Submit ";
            if (AcctType.value == "merchant") {
                $.post(this.ApiURL + 'merchant/merchantregister', {
                    'data': {
                        'captchaToken': parent.captchaToken,
                        'firstName': firstname.value,
                        'lastName': lastname.value,
                        'company': company.value,
                        'contact': contact.value,
                        'email': email.value,
                        'password': password.value
                    }
                }, function (res) {
                    //  console.log('Response',res);
                    button.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
                    if (res.status == "failure") {
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> " + res.message + "</div>";
                        document.getElementById("re_captcha").innerHTML = "";
                        parent.displayRecaptcha();
                    }
                    else {
                        error.innerHTML = "";
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";
                        setTimeout(function () {
                            parent.redirect('page-login', {});
                        }, 2000);
                    }
                });
            }
            else if (AcctType.value == "user") {
                $.post(this.ApiURL + 'users/userregister', {
                    'data': {
                        'captchaToken': parent.captchaToken,
                        'firstName': firstname.value,
                        'lastName': lastname.value,
                        'company': company.value,
                        'contact': contact.value,
                        'email': email.value,
                        'password': password.value
                    }
                }, function (res) {
                    //  console.log('Response',res);
                    button.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
                    if (res.status == "failure") {
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> " + res.message + "</div>";
                        document.getElementById("re_captcha").innerHTML = "";
                        parent.displayRecaptcha();
                    }
                    else {
                        error.innerHTML = "";
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";
                        setTimeout(function () {
                            parent.redirect('page-login', {});
                        }, 2000);
                    }
                });
            }
            else if (AcctType.value == "gbcistaff") {
                $.post(this.ApiURL + 'users/gbcistaffregister', {
                    'data': {
                        'captchaToken': parent.captchaToken,
                        'firstName': firstname.value,
                        'lastName': lastname.value,
                        'company': company.value,
                        'contact': contact.value,
                        'email': email.value,
                        'password': password.value
                    }
                }, function (res) {
                    //  console.log('Response',res);
                    button.innerHTML = '<i class="fa fa-lightbulb-o" aria-hidden="true"></i> &nbsp; Submit';
                    if (res.status == "failure") {
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #D8000C;font-style: oblique;font-size:13px;' ><i class='fa fa-times-circle'></i> " + res.message + "</div>";
                        document.getElementById("re_captcha").innerHTML = "";
                        parent.displayRecaptcha();
                    }
                    else {
                        error.innerHTML = "";
                        error.innerHTML = "<div class='text-shadow text-center fadeIn animated' style='color: #4A5D6C;font-style: oblique;font-size:13px;' ><i class='fa fa-check'></i> &nbsp;Registered successfully</div>";
                        setTimeout(function () {
                            parent.redirect('page-login', {});
                        }, 2000);
                    }
                });
            }
        } //check for no error
        //console.log('OnSubmit',this.captchaToken);
    }; //Submit
    MerchantRegisterComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\nbody{\n  background-color:#eaebec;\n}\n.header-content{\n  text-shadow: 0 0 5px white;\n  background-image:url(./webroot/images/trans.png);\n  padding:5px;\n  border-radius: 5px;\n  height: 100% !important;\n    background-position: center !important;\n    background-repeat: no-repeat !important;\n    background-size: cover !important;\n}\n\n    .login {\n      width: 400px;\n      margin: 16px auto;\n      font-size: 16px;\n    }\n\n    /* Reset top and bottom margins from certain elements */\n    .login-header,\n    .login p {\n      margin-top: 0;\n      margin-bottom: 0;\n    }\n\n    /* The triangle form is achieved by a CSS hack */\n    .login-triangle {\n      width: 0;\n      margin-right: auto;\n      margin-left: auto;\n      border: 12px solid transparent;\n      border-bottom-color: #4a5d6c; /*#28d;*/\n    }\n\n    .login-header {\n      background: #4a5d6c; /*#28d;*/\n      padding: 20px;\n      font-size: 1.4em;\n      font-weight: normal;\n      text-align: center;\n      text-transform: uppercase;\n      color: #fff;\n    }\n\n    .login-container {\n    /*  background: #ebebeb; */\n    background-image:url(./webroot/images/transparent-60.png);\n      padding: 12px;\n      border: 1px solid silver;\n    }\n\n    /* Every row inside .login-container is defined with p tags */\n    .login p {\n      padding: 5px;\n    }\n\n    .login input, .login .submit {\n      box-sizing: border-box;\n      display: block;\n      width: 100%;\n      border-width: 1px;\n      border-style: solid;\n      padding: 5px; border-radiu: 3px;\n      outline: 0;  \n      font-size: 0.95em;\n    }\n\n    .login input,\n    .login input[type=\"password\"] {\n      background: #fff;\n      border-color: #bbb;\n      color: #555;\n    }\n\n    /* Text fields' focus effect */\n    .login input:focus {\n      border-color: #888;\n    }\n\n    .login .submit {\n      background: #4a5d6c;/*#28d;*/\n      border-color: transparent;\n      color: #fff;\n      cursor: pointer;\n    }\n\n    .login .submit:hover {\n      background: #556b7d;/*#17c;*/\n    }\n\n    /* Buttons' focus effect */\n    .login .submit:focus {\n      border-color: #05a;\n    }\n\n\n\n    input[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    margin: 0;\n}\n\n\n    "],
            templateUrl: './app/pages/users/register.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], MerchantRegisterComponent);
    return MerchantRegisterComponent;
}(app_component_1.AppComponent));
exports.MerchantRegisterComponent = MerchantRegisterComponent;
