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
var app_component_1 = require("./../../app.component");
var router_1 = require("@angular/router");
var global_service_1 = require("./../../services/global.service");
var TopMenuLanding = (function (_super) {
    __extends(TopMenuLanding, _super);
    function TopMenuLanding(router, globalService) {
        var _this = _super.call(this, router, globalService) || this;
        _this.router = router;
        _this.globalService = globalService;
        _this.userInformation = {};
        _this.token = localStorage.getItem('GBCItoken');
        _this.accountType = localStorage.getItem('GBCIaccountType');
        _this.userRoleType = localStorage.getItem('GBCIRole');
        _this.ProductCompareArry = [];
        return _this;
    }
    TopMenuLanding.prototype.ngOnInit = function () {
        $("body").css('background-image', 'none');
        if (this.accountType != '' && this.accountType != null) {
            this.getMemberInfo();
        }
        // this.ProductCompareArry=this.globalService.getData().ComparProductId;
        // console.log('this.ProductCompareArry',this.ProductCompareArry);
    };
    TopMenuLanding.prototype.logout = function () {
        localStorage.removeItem('GBCItoken');
        localStorage.removeItem('GBCIaccountType');
        localStorage.removeItem('GBCIRole');
        this.token = '';
        this.globalService.removeData();
        //  localStorage.removeItem('globalServiceData');
        this.redirect('page-logout', {});
    };
    TopMenuLanding.prototype.getMemberInfo = function () {
        var parent = this;
        $.post(this.ApiURL + 'Merchant/merchant_information', {
            'data': {
                'key': parent.token,
                'extra': {
                    'required': ['firstName', 'lastName', 'email']
                }
            }
        }, function (res) {
            if (res != null) {
                //  var existingGlobalService= parent.globalService.getData();
                //  existingGlobalService.userInfo=res.userInfo;
                //    parent.globalService.setData(existingGlobalService);
                parent.globalService.setData({
                    'userInfo': res.userInfo
                });
                //  parent.globalService.setData({
                //    'projec': {
                //       'name':'test',
                //       'profile':'added'
                //    }
                //  });
                //console.log('=====',parent.globalService.getData());
                //this.productsInfo = [1];
                parent.userInformation = res.userInfo;
                //  console.log(parent.userInformation,parent.userInformation.email);
            }
        });
    };
    TopMenuLanding.prototype.clone_scrollToRatings = function () {
        $('html, body').animate({
            scrollTop: $("#ratings-info").offset().top
        }, 2000);
    };
    TopMenuLanding.prototype.clone_scrollToBody = function () {
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 2000);
    };
    TopMenuLanding = __decorate([
        core_1.Component({
            selector: 'top-menu-landing',
            styles: ["\n    \t/* Navigation */\n    /*\t#menu {\n    \t\tpadding: 20px;\n    \t\ttransition: all 0.8s;\n    \t} */\n\t#menu {\n      background-color:/* #6c7476 */ /*#6b878c*/  /** #009aee*/ /* #00a79d #607d8b */rgba(255, 255, 255, 0) !important;\n          padding: 3px;\n          opacity: 0.9;\n          transition: all 0.8s;\n          box-shadow:none;\n        }\n\n    \t#menu.navbar-default {\n    \t\tbackground-color: rgba(248, 248, 248, 0);\n    \t\tborder-color: rgba(231, 231, 231, 0);\n        opacity:1;\n    \t}\n      #menu.navbar-default.scrolled {\n    \t\tbackground-color: white !important;\n    \t\tborder-color: rgba(231, 231, 231, 0);\n        box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);\n    \t}\n      #menu.navbar-default.loggedin-header {\n    \t\tbackground-color: white !important;\n    \t\tborder-color: rgba(231, 231, 231, 0);\n        box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);\n    \t}\n      #menu.navbar-default.loggedin-header .navbar-brand {\n    \t\tcolor: #595959;\n    \t}\n      #menu.navbar-default.loggedin-header .navbar-nav > li > a {\n    \t\tcolor: #595959;\n    \t}\n\n      #menu.navbar-default.scrolled .navbar-nav > li > a {\n    \t\tcolor: #595959;\n    \t}\n      #menu.navbar-default.scrolled .navbar-brand {\n    \t\tcolor: #595959;\n    \t}\n\n    \t#menu a.navbar-brand {\n    \t\t/*font-family: 'Dancing Script', cursive;*/\n    \t\tfont-size: 20px;\n    \t\tcolor: #fff;\n        /*font-weight:normal;*/\n    \t\tfont-weight: 700;\n    \t\tletter-spacing: 1px;\n    \t}\n    \t#menu.navbar-default .navbar-nav > li > a {\n    \t\t// text-transform: uppercase;\n    \t\tcolor: #fff;\n        font-size: 15px;\n        font-weight: normal;\n        padding: 10px 15px;\n    \t\t/* font-weight: 500;\n    \t\tfont-size: 15px;\n    \t\tpadding: 5px 0;\n        margin: 10px 15px 0 15px;\n        */\n    \t\tborder: 2px solid transparent;\n    \t\tletter-spacing: 0.5px;\n\n    \t}\n\n    \t#menu.navbar-default .navbar-nav > li > a:hover {\n    \t/*\tcolor: #8eb640;  color: #c2ceff */;\n    \t}\n    \t.on {\n    \t\tbackground-color: #262626 !important;\n    \t\tpadding: 0 !important;\n    \t\tpadding: 2px 0 !important;\n    \t}\n    \t.navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n    \t\tcolor: #8eb640 !important;\n    \t\tbackground-color: transparent;\n    \t}\n    \t.navbar-toggle {\n    \t\tborder-radius: 0;\n    \t}\n    \t.navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {\n    \t\tbackground-color: #8eb640;\n    \t\tborder-color: #8eb640;\n    \t}\n    \t.navbar-default .navbar-toggle:hover>.icon-bar {\n    \t\tbackground-color: #FFF;\n    \t}\n    \t.section-title {\n    \t\tmargin-bottom: 70px;\n    \t}\n    \t.section-title .overlay {\n    \t\tpadding: 80px 0;\n    \t\tbackground: rgba(0, 0, 0, 0.7);\n    \t}\n    \t.section-title p {\n    \t\tfont-size: 22px;\n    \t\tcolor: rgba(255,255,255,0.8);\n    \t}\n    \t.section-title hr {\n    \t\tmargin: 0 auto;\n    \t\tmargin-bottom: 40px;\n    \t}\n    \t.btn-custom {\n    \t\ttext-transform: uppercase;\n    \t\tcolor: #fff;\n    \t\tbackground-color: #72a411;\n    \t\tborder: 0;\n    \t\tpadding: 14px 20px;\n    \t\tmargin: 0;\n    \t\tfont-size: 16px;\n    \t\tfont-weight: 500;\n    \t\tletter-spacing: 0.5px;\n    \t\tborder-radius: 0;\n    \t\tmargin-top: 20px;\n    \t\ttransition: all 0.5s;\n    \t}\n    \t.btn-custom:hover, .btn-custom:focus, .btn-custom.focus, .btn-custom:active, .btn-custom.active {\n    \t\tcolor: #fff;\n    \t\tbackground-color: #628d0f;\n    \t}\n\n      .navbar-login\n      {\n          width: 220px;\n          padding: 5px;\n          padding-bottom: 0px;\n      }\n\n      .navbar-login-session\n      {\n          padding: 6px;\n          padding-bottom: 0px;\n          padding-top: 0px;\n      }\n\n      .icon-size\n      {\n          font-size: 50px;\n      }\n      //\n      // .undLine li::after {\n      //     background-color: #23527c;\n      //     width: 0;\n      //     height: 3px;\n      //     left: 0;\n      //     bottom: 0;\n      //     transition: width 0.35s ease 0s;\n      //     position: absolute;\n      //   }\n      //\n      // .undLine li:hover::after {\n      //     width: 100%;\n      //   }\n\n      .glow {\n        cursor: pointer;\n        -webkit-transition: 0.5s ease-in-out;\n        -moz-transition: 0.5s ease-in-out;\n        -ms-transition: 0.5s ease-in-out;\n        -o-transition: 0.5s ease-in-out;\n        transition: 0.5s ease-in-out;\n        -webkit-text-shadow: 0 0 0 transparent, 0 0 0 transparent;\n        -moz-text-shadow: 0 0 0 transparent, 0 0 0 transparent;\n        -ms-text-shadow: 0 0 0 transparent, 0 0 0 transparent;\n        -o-text-shadow: 0 0 0 transparent, 0 0 0 transparent;\n        /*text-shadow: 0 0 0 transparent, 0 0 0 transparent;\n        color: rgba(0, 0, 0, 0.1);*/\n        overflow: visible;\n      }\n      .glow:hover {\n        color: #333;\n        -webkit-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;\n        -moz-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;\n        -ms-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;\n        -o-text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;\n        text-shadow: 0 0 10px #45526E, 0 0 50px #ff9b1a;\n      }\n\n\n  \t"],
            template: "\n  \t\t<nav id=\"menu\" class=\"navbar navbar-default navbar-fixed-top\" [ngClass]=\"{'loggedin-header': token!='' && token!=null}\">\n  \t\t  <div class=\"container\">\n  \t\t    <!-- Brand and toggle get grouped for better mobile display -->\n  \t\t    <div class=\"navbar-header\">\n  \t\t      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"> <span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button>\n  \t\t      <a  *ngIf=\"token=='' || token==null\" class=\"navbar-brand page-scroll  \" href=\"#\" (click)=\"clone_scrollToBody();\">GBCI Product Database</a>\n\n            <a  *ngIf=\"token!='' && token!=null \" class=\"navbar-brand page-scroll \" href=\"#page-landing\" (click)=\"clone_scrollToBody();\">GBCI Product Database</a>\n\n            </div>\n\n\n\n  \t\t    <!-- Collect the nav links, forms, and other content for toggling -->\n  \t\t    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n  \t\t      <ul class=\"nav navbar-nav navbar-right \">\n\n            <!--  <li class=\"\" *ngIf=\"accountType=='' || accountType==null\"><a href=\"#page-about\" class=\"page-scroll\">About</a></li>\n\n            <li class=\"\" *ngIf=\"token!='' && token!=null\"><a href=\"#page-ratings\" class=\"page-scroll\">Ratings</a></li>\n  \t\t        <li class=\"\" *ngIf=\"token!='' && token!=null\"><a href=\"#page-faq\" class=\"page-scroll\">FAQ</a></li>\n  \t\t        <li class=\"\" *ngIf=\"token!='' && token!=null\"><a href=\"#page-contact\" class=\"page-scroll\">Contact Us</a></li> -->\n\n            <!--  <li *ngIf=\"token!='' && token!=null \"><a (click)=\"logout();\">Logout</a></li>-->\n              <li class=\"\" *ngIf=\"token=='' || token==null\"><a href=\"#page-login\">Login</a></li>\n              <!-- <li><a href=\"#page-merchant-register\">Register</a></li> -->\n  \t\t      </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\" *ngIf=\"token!='' && token!=null \" >\n          <!--   <li *ngIf=\"token!='' && token!=null && accountType=='merchant'\" ><a class='pointer' href=\"#page-merchant-dashboard\"><i class=\"fa fa-desktop\" aria-hidden=\"true\"></i> Dashboard</a>&nbsp;</li>\n            <li *ngIf=\"token!='' && token!=null && accountType=='merchant'\" ><a class='pointer' href=\"#page-merchant-statistics-general\"><i class=\"fa fa-bar-chart\" aria-hidden=\"true\"></i> Analytics</a>&nbsp;</li>\n\n            <li *ngIf=\"token!='' && token!=null && userRoleType=='admin'\" ><a class='pointer' href=\"#page-product-approval\"><i class=\"fa fa-desktop\" aria-hidden=\"true\"></i> GBCI Dashboard</a>&nbsp;</li>\n            <li *ngIf=\"token!='' && token!=null && accountType!='merchant'\"><a class='pointer' href=\"#page-project\">Projects</a></li>\n             <li *ngIf=\"token!='' && token!=null \"><a href=\"#page-listing\" class=\"pointer\">Database</a></li>\n -->\n             <li *ngIf=\"token!='' && token!=null && accountType=='merchant'\" ><a class='pointer ' href=\"#page-merchant-dashboard\">Dashboard</a>&nbsp;</li>\n             <li *ngIf=\"token!='' && token!=null \"><a href=\"#page-listing\" class=\"pointer\">Database</a></li>\n             <li *ngIf=\"token!='' && token!=null && accountType=='merchant'\" ><a class='pointer ' href=\"#page-merchant-statistics-general\">Analytics</a>&nbsp;</li>\n             <li *ngIf=\"token!='' && token!=null && userRoleType=='admin'\" ><a class='pointer ' href=\"#admin-analytics\">Analytics</a>&nbsp;</li>\n             <li *ngIf=\"token!='' && token!=null && userRoleType=='admin'\" ><a class='pointer ' href=\"#page-product-approval\">GBCI Dashboard</a>&nbsp;</li>\n             <li *ngIf=\"token!='' && token!=null && accountType!='merchant'\">\n             <a class='pointer '\n              href=\"#page-project/_\"\n              >Projects</a></li>\n              <!-- href=\"#page-project\" -->\n            <!--  <li *ngIf=\"token!='' && token!=null \"><a href=\"#page-listing\" class=\"pointer \">Database</a></li>\n-->\n\n         <li class=\"dropdown\">\n             <a style=\"background-color: transparent;\" href=\"#\" class=\"dropdown-toggle \" data-toggle=\"dropdown\">\n            <span class=\"glyphicon glyphicon-user\"></span>\n                 {{userInformation.firstName}}\n                 <i class=\"fa fa-caret-down\"></i>\n             </a>\n             <ul class=\"dropdown-menu\" style=\"margin-top: 6px;margin-right: -60px;border-radius: 3px\">\n                    <li>\n                        <div class=\"navbar-login\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-4\">\n                                    <p class=\"text-center\">\n                                    <span class=\"glyphicon glyphicon-user icon-size\"></span>\n                                    </p>\n                                </div>\n                                <div class=\"col-sm-8\">\n                                    <p class=\"text-left\"><strong> {{userInformation.firstName}}  {{userInformation.lastName}}</strong></p>\n                                    <p class=\"text-left small\"> {{userInformation.email}}</p>\n\n                                </div>\n                            </div>\n                        </div>\n                    </li>\n                      <li class=\"divider navbar-login-session-bg\"></li>\n                        <li class=\"pointer\"><a href=\"#page-mail-box\"><span   style=\"float: right !important;\"> <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i> </span> Messages </a></li>\n                        <li class=\"divider\"></li>\n                       <li class=\"pointer\"><a href=\"#page-profile-info\">\n                       <span class=\"glyphicon glyphicon-cog\" style=\"float: right !important;\"></span>\n                         Account Settings\n\n                           </a>\n                       </li>\n\n                    <!--  <li class=\"pointer\"><a href=\"#page-mail-box\"><span class=\"badge\" style=\"float: right !important;\"> 0 </span> Notifications </a></li> -->\n\n                      <li class=\"divider\"></li>\n                      <li class=\"pointer\"><a (click)=\"logout();\"><span class=\"glyphicon glyphicon-log-out\" style=\"float: right !important;\"></span> Log Out </a></li>\n                </ul>\n         </li>\n     </ul>\n\n  \t\t    </div>\n  \t\t    <!-- /.navbar-collapse -->\n  \t\t  </div>\n  \t\t</nav>\n  \t\t<!-- TOP_menu -->\n\n  \t",
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], TopMenuLanding);
    return TopMenuLanding;
}(app_component_1.AppComponent));
exports.TopMenuLanding = TopMenuLanding;
