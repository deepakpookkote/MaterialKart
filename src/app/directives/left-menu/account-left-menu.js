"use strict";
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
var global_service_1 = require("./../../services/global.service");
var AccountLeftMenu = (function () {
    function AccountLeftMenu(router, globalService) {
        this.router = router;
        this.globalService = globalService;
        this.token = localStorage.getItem('GBCItoken');
        this.accountType = localStorage.getItem('GBCIaccountType');
        //super(router,globalService);
    }
    AccountLeftMenu.prototype.ngOnInit = function () {
        this.updateMemberInfo();
    };
    AccountLeftMenu.prototype.updateMemberInfo = function () {
        var parent = this;
        setTimeout(function () {
            parent.userInfo = (parent.globalService.getData()).userInfo;
        }, 500);
    };
    __decorate([
        core_1.Input('myParameters'),
        __metadata("design:type", Object)
    ], AccountLeftMenu.prototype, "_dir_data", void 0);
    AccountLeftMenu = __decorate([
        core_1.Component({
            selector: 'account-left-menu',
            styles: ["\n\n    .acc-left-profile-image{\n      background: #e7e7e7;\n    /*  background-image:url('./webroot/images/profile-image/profile-bg.jpg'); */\n      /*background-size: 100%;*/\n      background-size: 100% 80px;\n      background-repeat: no-repeat;\n\n    border-bottom: 1px solid #aeb7b6;\n    /*\n    -webkit-box-shadow: 0 6px 4px -4px grey;\n    -moz-box-shadow: 0 6px 4px -4px grey;\n    box-shadow: 0 6px 4px -4px grey;\n    */\n    }\n    .acc-left-profile-image img{\n      border-radius: 50%;\n      margin:10%;\n      height: 85px; width: 85px;\n      background-color:#ffffff;\n    /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */\n    }\n    .acc-left-profile-image label{\n    /*  background-image:url('./webroot/images/profile-image/trans-white-2.png');*/\n      width: 100%; padding: 5px;\n      position: relative;\n      top: -5px;\n      color: black;\n\n    }\n    .acc-left-nav{\n      border-top: 1px solid #ffffff;\n    }\n    .acc-left-nav ul{\n      list-style: none;\n    }\n    .acc-left-nav ul li{\n      font-size: 14px;\n      padding: 10px;\n      padding-left:20px;\n      border-bottom: 1px solid #dfdfdf;\n      transition:  background-color 1s;\n    }\n    .acc-left-nav ul li:hover{\n      background-color:#dfdfdf;\n      border-bottom: 1px solid #ffffff; cursor: pointer;\n      /* animation: animationSmooth 1s; */\n    }\n    .acc-left-nav ul li i{ padding-right:10px; }\n\n\n.acc-left-profile-image .social-icons{\n  position:relative;\n  top: -8px;\n  cursor:pointer;\n  color: #6c6d71;\n  /*animation: animationSmooth 2s;*/\n}\n@media(max-width: 700px){\n  .account-left-menu1{\n    width: 60px;\n  }\n  .acc-left-profile-image img{\n    height: 30px; width: 30px;\n  }\n  .acc-left-profile-image label{ display: none;}\n}\n\n  "],
            template: "\n  <div class=\"acc-left-profile-image text-center\" >\n<a href=\"#page-profile-info\">\n\n     <div style=\"height: 10px;\"></div>\n     <!--<img style=\" \" src=\"webroot/images/dashboard/profile-awatar.png\"  />-->\n     <img src=\"webroot/images/profile-image/Icon-user.jpg\" style=\"width: 80px;height: 80px;padding:10px;\"/>\n <!-- <label> {{'John Smith iguy ukgfukf ukf udy' | slice:0:25}}</label> -->\n    </a>\n\n<div class=\"social-icons animated rubberBand\">\n<!--  <i class=\"fa fa-facebook-square fa-lg\" aria-hidden=\"true\"></i>\n  <i class=\"fa fa-twitter-square fa-lg\" aria-hidden=\"true\"></i>\n  <i class=\"fa fa-linkedin-square fa-lg\" aria-hidden=\"true\"></i> -->\n  <div style=\"min-height: 25px;font-size:16px;\">\n    <div *ngIf=\"userInfo!='' && userInfo!=undefined \">{{userInfo.firstName}} {{userInfo.lastName}} </div>\n  </div>\n</div>\n\n  </div>\n  <div class=\"acc-left-nav\">\n   <ul *ngIf=\"_dir_data!='message-box'\">\n    <!--<li>\n      <a> <i class=\"fa fa-bell\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\">Notifications - <b style=\"color: #00a79d;\">0</b> </span></a>\n    </li>-->\n    <!-- <li>\n      <a href=\"#page-merchant-dashboard \"> <i class=\"fa fa-life-ring\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\">Dashboard</span></a>\n    </li> -->\n\n    <li *ngIf=\"accountType=='merchant'\">\n      <a href=\"#page-merchant-products\"> <i class=\"fa fa-database\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\" style=\"font-size:16px;\">Your Products</span></a>\n    </li>\n    <li *ngIf=\"accountType=='merchant'\">\n      <a href=\"#page-merchant-users-management\"> <i class=\"fa fa-database\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\" style=\"font-size:16px;\">Users Management</span></a>\n    </li>\n  <!--  <li *ngIf=\"accountType=='merchant'\">\n      <a  href=\"#page-merchant-statistics-general\"> <i class=\"fa fa-line-chart\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\">Statistics</span></a>\n    </li> -->\n     <!--<li *ngIf=\"accountType=='merchant'\">\n      <a href=\"#page-merchant-member-view\"> <i class=\"fa fa-users\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\">Team Members</span></a>\n    </li>-->\n   </ul>\n   <ul *ngIf=\"_dir_data=='message-box'\">\n\n    <li id=\"msgboxInbox\">  <a id=\"msgboxInbox\"> <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i> <span id=\"msgboxInbox\" class=\"hidden-xs\">Inbox</span></a></li>\n      <li id=\"msgboxSent\">  <a  id=\"msgboxSent\"  > <i  class=\"fa fa-share-square-o\" aria-hidden=\"true\"></i> <span id=\"msgboxSent\" class=\"hidden-xs\">Sent</span></a> </li>\n    <!--    <li>  <a href=\"#\"> <i class=\"fa fa-bell\" aria-hidden=\"true\"></i> <span class=\"hidden-xs\">Others</span></a> </li> -->\n\n   </ul>\n   <div>\n  <!-- <img class=\"hidden-xs\" src=\"webroot/images/dashboard/database-icon.png\"  style=\"opacity:0.6; width: 150px; position: fixed; bottom: 0px; left: 2%;\" /> -->\n   </div>\n </div>\n  ",
        }),
        __metadata("design:paramtypes", [router_1.Router, global_service_1.globalService])
    ], AccountLeftMenu);
    return AccountLeftMenu;
}());
exports.AccountLeftMenu = AccountLeftMenu;
