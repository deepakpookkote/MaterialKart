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
var ContactComponent = (function (_super) {
    __extends(ContactComponent, _super);
    function ContactComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Angular';
        return _this;
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
    };
    ContactComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            styles: ["\n\n\n\n\n    /* Header Section */\n    .intro {\n    /* display: table;\n     width: 100%;\n     padding: 0;\n     background: url(./webroot/images/landing-page/GBCI-5.jpeg) no-repeat center center fixed;\n     background-color: #e5e5e5;\n     -webkit-background-size: cover;\n     -moz-background-size: cover;\n     background-size: cover;\n     -o-background-size: cover;\n     filter:brightness(200%);*/\n      display: table;\n      width: 100%;\n      padding: 0;\n      background: url(./webroot/images/landing-page/GBCI-3.jpg);\n      background-color: #e5e5e5;\n      -webkit-background-size: cover;\n      -moz-background-size: cover;\n      background-size: cover;\n      -o-background-size: cover;\n      background-position-x: 0;\n      background-position-y: 81%;\n      background-attachment: fixed;\n    }\n    .intro .overlay {\n     background: rgba(0,0,0,0.4);\n     /*height: 665px;*/\n     height: 374px;\n    }\n    .intro h1 {\n\n     color: #fff;\n     font-size: 10em;\n    /*\tfont-weight: 700;*/\n     margin-top: 0;\n     margin-bottom: 60px;\n     font-weight: lighter;\n    }\n    .intro span {\n     color: #a7c44c;\n     font-weight: 600;\n    }\n    .intro p {\n     color: #fff;\n     font-size: 32px;\n     font-weight: 300;\n     margin-top: 10px;\n     margin-bottom: 40px;\n    }\n    header .intro-text {\n     padding-top: 250px;\n     padding-bottom: 200px;\n     text-align: center;\n    }\n\n\n\n\n\n\n\n\n\n    .contactField{\n      border-bottom: 2px solid silver;\n    }\n    .contactField:focus{\n      border-bottom: 2px solid #4285f4;\n    }\n  /*  .contactField{\n      width: 100%;\n      background: #eee;\n      color: #999;\n      font-size: 16px;\n      transition: background-color 0.3s ease 0s;\n      padding: 7px 18px;\n      height: 50px;\n      -webkit-box-shadow: none;\n      box-shadow: none;\n      border-radius: 0;\n      border: none;\n  }\n  .form-control:focus {\n    border-color: inherit;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n    outline: 1px solid black;\n  } */\n  .contactLabel{\n      font-size: 1.3em;\n      font-weight: 300;\n      color: #333;\n  }\n  .form-group{\n      margin-bottom: 25px;\n  }\n  .sidebar-right{\n      background: #f6f7f9;\n      padding: 20px;\n      margin-top: 135px;\n  }\n  .sidebar-right h5{\n      color: #878a8e;\n  }\n  .sidebar-right p{\n      font-size: 0.99em;\n      color: #878a8e;\n      font-weight: inherit;\n  }\n  .mr5{\n      margin-right: 5px;\n  }\n\n\n.md-form{\n  padding: 2px;\n  margin-bottom:0px;\n  margin-top:2px;\n}\n.padding5{\n  padding: 5px;\n}\n.padding10{\n  padding: 10px;\n}\n\n  "],
            //  template: `  `,
            templateUrl: './app/pages/contact/contact.template.html'
        })
    ], ContactComponent);
    return ContactComponent;
}(app_component_1.AppComponent));
exports.ContactComponent = ContactComponent;
