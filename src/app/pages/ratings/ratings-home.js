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
var RatingsHomeComponent = (function (_super) {
    __extends(RatingsHomeComponent, _super);
    function RatingsHomeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RatingsHomeComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
    };
    RatingsHomeComponent = __decorate([
        core_1.Component({
            //selector: 'my-app',
            styles: ["\n\n    body{\n    background-color:green;\n    }\n\n        /* Header Section */\n        .intro {\n        /* display: table;\n         width: 100%;\n         padding: 0;\n         background: url(./webroot/images/about/pexels-photo-348323.jpeg) no-repeat center center fixed;\n         background-color: #e5e5e5;\n         -webkit-background-size: cover;\n         -moz-background-size: cover;\n         background-size: cover;\n         -o-background-size: cover;\n         filter:brightness(200%);*/\n         display: table;\n         width: 100%;\n         padding: 0;\n         background: url(./webroot/images/landing-page/GBCI-2.jpg);\n         background-color: #e5e5e5;\n         -webkit-background-size: cover;\n         -moz-background-size: cover;\n         background-size: cover;\n         -o-background-size: cover;\n         background-position-x: 0;\n         background-position-y: 81%;\n         background-attachment: fixed;\n        }\n        .intro .overlay {\n         background: rgba(0,0,0,0.4);\n         /*height: 665px;*/\n         height: 374px;\n        }\n        .intro h1 {\n    \n         color: #fff;\n         font-size: 10em;\n        /*\tfont-weight: 700;*/\n         margin-top: 0;\n         margin-bottom: 60px;\n         font-weight: lighter;\n        }\n        .intro span {\n         color: #a7c44c;\n         font-weight: 600;\n        }\n        .intro p {\n         color: #fff;\n         font-size: 32px;\n         font-weight: 300;\n         margin-top: 10px;\n         margin-bottom: 40px;\n        }\n        header .intro-text {\n         padding-top: 250px;\n         padding-bottom: 200px;\n         text-align: center;\n        }\n\n\n.container-fluid{\n  background-image:url(./webroot/images/stock-images/merchant-register-bg.jpeg);\n  background-size: 110%; background-repeat:no-repeat;\n\n}\n  .panel-leed-cover{\n    background-image:url(./webroot/images/ratings-images/leed.jpg);\n  }\n  .panel-sites-cover{\n    background-image:url(./webroot/images/ratings-images/sites-swaner.jpg);\n  }\n  .panel-peer-cover{\n    background-image:url(./webroot/images/ratings-images/peer-powerlines.jpg);\n  }\n  .panel-well-cover{\n    background-image:url(./webroot/images/ratings-images/well-hallway.jpg);\n  }\n  .panel-edge-cover{\n    background-image:url(./webroot/images/ratings-images/edge-buildings.jpg);\n  }\n  .panel-gresb-cover{\n    background-image:url(./webroot/images/ratings-images/gresb-buildings.jpg);\n  }\n  .panel-parksmart-cover{\n    background-image:url(./webroot/images/ratings-images/parksmart.jpg);\n  }\n  .panel-zero-waste-cover{\n    background-image:url(./webroot/images/ratings-images/zero-waste.jpg);\n  }\n  @media only screen and (max-width: 768px) {\n    .ratings-list {\n      height: 600px !important;\n    }\n  }\n  @media only screen and (max-width: 768px) {\n    .copy.three-quart.left.image-right.v-center-wrapper, .copy.three-quart.right.v-center-wrapper {\n      display: block;\n    }\n  }\n  .image{\n    height:100%;\n    background-color: transparent;\n    background-repeat: no-repeat;\n    background-position: center top;\n    background-size: cover;\n  }\n  .inner{\n    height: 100%;\n   /* background: #4a5d6c;\n    color: white;*/\n    padding: 3%;\n    line-height: 3;\n    letter-spacing: 1px;\n  }\n  .inner hr{\n    width: 40%;\n    border-color: #4a5d6c;\n  }\n\n  .inner p{ line-height:25px; text-align: justify;  }\n\n\n    "],
            templateUrl: './app/pages/ratings/ratings-home.template.html',
        })
    ], RatingsHomeComponent);
    return RatingsHomeComponent;
}(app_component_1.AppComponent));
exports.RatingsHomeComponent = RatingsHomeComponent;
