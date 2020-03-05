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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_component_1 = require("./../../app.component");
var TopMenu = (function (_super) {
    __extends(TopMenu, _super);
    function TopMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.token = localStorage.getItem('GBCItoken');
        return _this;
    }
    TopMenu.prototype.logout = function () {
        localStorage.removeItem('GBCItoken');
        this.token = '';
        this.redirect('page-landing', {});
    };
    TopMenu = __decorate([
        core_1.Component({
            selector: 'top-menu',
            styles: ["\n    .top-menu a{\n    /*  color: green;*/\n    color: white;\n\n    }\n    .top-menu a:hover{\n     color: #8eb640;\n    }\n  "],
            template: "\n\n\n<!--\n<nav class=\"navbar navbar-fixed-top navbar-default top-menu\" style=\"background: #e7e7e7; border-bottom:1px solid silver;\">\n-->  <nav class=\"navbar navbar-fixed-top navbar-default top-menu\" style=\"background: #6b878c; border-bottom:1px solid silver;\">\n    <div class=\"container\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\" >Material</a>\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n    <!--  <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\n        <ul class=\"nav navbar-nav navbar-right\">\n\n          <li class=\"dropdown\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Shop by Category <span class=\"caret\"></span></a>\n            <ul class=\"dropdown-menu\">\n              <li><a href=\"#\">Action</a></li>\n              <li><a href=\"#\">Category one</a></li>\n              <li><a href=\"#\">Category two</a></li>\n              <li role=\"separator\" class=\"divider\"></li>\n              <li><a href=\"#\">Some other category</a></li>\n            </ul>\n          </li>\n          <li><a href=\"#\">Contact us</a></li>\n          <li><a href=\"#page-login\">Login</a></li>\n          <li class=\"pointer\"><a href=\"#page-merchant-register\">Register</a></li>\n        </ul>\n      </div>\n      -->\n      <!-- /.navbar-collapse -->\n\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li><a href=\"#page-about\" class=\"page-scroll\">About</a></li>\n          <li ><a href=\"#page-landing#ratingspos\"  class=\"page-scroll\">Ratings</a></li>\n          <li><a href=\"#page-faq\" class=\"page-scroll\">FAQ</a></li>\n          <li><a href=\"#page-contact\" class=\"page-scroll\">Contact Us</a></li>\n      <!--    <li><a href=\"#page-login\">Login</a></li>\n          <li><a href=\"#page-merchant-register\">Register</a></li> -->\n          <li *ngIf=\"token!=''\"><a (click)=\"logout();\">Logout</a></li>\n          <li *ngIf=\"token==''\"><a href=\"#page-login\">Login</a></li>\n          <!--  <li><a target=\"_new\" href=\"#page-register\">Register</a></li> -->\n        </ul>\n      </div>\n\n\n\n    </div><!-- /.container-fluid -->\n  </nav>\n\n<div style=\"height:70px;\"></div>\n\n  ",
        })
    ], TopMenu);
    return TopMenu;
}(app_component_1.AppComponent));
exports.TopMenu = TopMenu;
