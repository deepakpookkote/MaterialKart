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
var RatingsInfoComponent = (function (_super) {
    __extends(RatingsInfoComponent, _super);
    function RatingsInfoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageContent = '';
        return _this;
    }
    RatingsInfoComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
        this.getAbout();
        //  console.log('GGGGGG');
    };
    RatingsInfoComponent.prototype.getAbout = function () {
        var parent = this;
        $.post(this.ApiURL + 'pages/public_page_view', {
            'data': {
                'filter': {
                    'slug': 'ratings-leed'
                }
            }
        }, function (res) {
            //console.log(res.pages[0]['content']);
            parent.pageContent = res.pages[0]['content'];
            //this.productsInfo = [1];
        });
    };
    RatingsInfoComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            styles: ["\n\n\n\n\n    /* Header Section */\n    .intro {\n     display: table;\n     width: 100%;\n     padding: 0;\n     background: url(./webroot/images/about/pexels-photo-348323.jpeg) no-repeat center center fixed;\n     background-color: #e5e5e5;\n     -webkit-background-size: cover;\n     -moz-background-size: cover;\n     background-size: cover;\n     -o-background-size: cover;\n     /*filter:brightness(200%);*/\n    }\n    .intro .overlay {\n     background: rgba(0,0,0,0.4);\n     /*height: 665px;*/\n     height: 300px;\n    }\n    .intro h1 {\n\n     color: #fff;\n     font-size: 10em;\n    /*\tfont-weight: 700;*/\n     margin-top: 0;\n     margin-bottom: 60px;\n     font-weight: lighter;\n    }\n    .intro span {\n     color: #a7c44c;\n     font-weight: 600;\n    }\n    .intro p {\n     color: #fff;\n     font-size: 32px;\n     font-weight: 300;\n     margin-top: 10px;\n     margin-bottom: 40px;\n    }\n    header .intro-text {\n     padding-top: 250px;\n     padding-bottom: 200px;\n     text-align: center;\n    }\n\n\n\n\n\n\n\n  "],
            //  template: `  `,
            templateUrl: './app/pages/ratings/ratingsinfo.template.html'
        })
    ], RatingsInfoComponent);
    return RatingsInfoComponent;
}(app_component_1.AppComponent));
exports.RatingsInfoComponent = RatingsInfoComponent;
