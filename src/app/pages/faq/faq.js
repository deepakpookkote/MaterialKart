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
var FaqComponent = (function (_super) {
    __extends(FaqComponent, _super);
    function FaqComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Angular';
        return _this;
    }
    FaqComponent.prototype.ngOnInit = function () {
        this.scrollToRatings();
        // this.jqinit();
        this.getFAQ();
    };
    FaqComponent.prototype.jqinit = function () {
        if ($(".toggle .toggle-title").hasClass('active')) {
            $(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
        }
        else {
            $(".toggle .toggle-title").closest('.toggle').find('.toggle-inner').hide();
        }
        $(".toggle .toggle-title").click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200);
            }
            else {
                $(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200);
            }
        });
        this.jqcss();
    };
    FaqComponent.prototype.jqcss = function () {
        $('toggle:last-child').css({
            'border-bottom': '1px solid #dddddd'
        });
        $('.toggle .toggle-title').css({
            'cursor': 'pointer',
            'position': 'relative',
            'display': 'block',
            'border-top': '1px solid #dddddd',
            'margin-bottom': '6px'
        });
        $('.toggle .toggle-title h3').css({
            'font-size': '18px',
            'margin': '0px',
            'line-height': '1',
            'cursor': 'pointer',
            /*  font-weight: 200; */
            'font-weight': '400'
        });
        $('.toggle .toggle-inner').css({
            'padding': '7px 25px 10px 25px',
            'display': 'none',
            'margin': '-7px 0 6px'
        });
        $('.toggle .toggle-inner div').css({
            'max-width': '100%'
        });
        $('.toggle .toggle-title .title-name').css({
            'display': 'block',
            'padding': '25px 25px 14px'
        });
        $('.toggle .toggle-title a i').css({
            'font-size': '22px',
            'margin-right': '5px'
        });
        $('.toggle .toggle-title .ispan').css({
            'position': 'absolute',
            'background': 'url("http://arielbeninca.com/Storage/plus_minus.png") 0px -24px no-repeat',
            'width': '24px',
            'height': '24px',
            '-webkit-transition': 'all 0.3s ease',
            'transition': 'all 0.3s ease',
            'margin': '22px',
            'right': '-30px'
        });
        $('.toggle .toggle-title.active .ispan').css({
            'background': 'url("http://arielbeninca.com/Storage/plus_minus.png") 0px 0px no-repeat'
        });
    };
    FaqComponent.prototype.getFAQ = function () {
        var parent = this;
        $.post(this.ApiURL + 'pages/public_page_view', {
            'data': {
                'filter': {
                    'slug': 'faq'
                }
            }
        }, function (res) {
            console.log(res.pages[0]['content']);
            parent.pageContent = res.pages[0]['content'];
            //  document.getElementById("cnt").innerHTML=parent.pageContent;
            //this.productsInfo = [1];
            parent.jqinit();
        });
    };
    FaqComponent = __decorate([
        core_1.Component({
            //  selector: ' ',
            styles: ["\n\n\n\n\n    /* Header Section */\n    .intro {\n    /* display: table;\n     width: 100%;\n     padding: 0;\n     background: url(./webroot/images/landing-page/GBCI-5.jpeg) no-repeat center center fixed;\n     background-color: #e5e5e5;\n     -webkit-background-size: cover;\n     -moz-background-size: cover;\n     background-size: cover;\n     -o-background-size: cover;\n     filter:brightness(200%);*/\n     display: table;\n     width: 100%;\n     padding: 0;\n     background: url(./webroot/images/landing-page/GBCI-5.jpeg);\n     background-color: #e5e5e5;\n     -webkit-background-size: cover;\n     -moz-background-size: cover;\n     background-size: cover;\n     -o-background-size: cover;\n     background-position-x: 0;\n     background-position-y: 81%;\n     background-attachment: fixed;\n    }\n    .intro .overlay {\n     background: rgba(0,0,0,0.4);\n     /*height: 665px;*/\n     height: 374px;\n    }\n    .intro h1 {\n\n     color: #fff;\n     font-size: 10em;\n    /*\tfont-weight: 700;*/\n     margin-top: 0;\n     margin-bottom: 60px;\n     font-weight: lighter;\n    }\n    .intro span {\n     color: #a7c44c;\n     font-weight: 600;\n    }\n    .intro p {\n     color: #fff;\n     font-size: 32px;\n     font-weight: 300;\n     margin-top: 10px;\n     margin-bottom: 40px;\n    }\n    header .intro-text {\n     padding-top: 250px;\n     padding-bottom: 200px;\n     text-align: center;\n    }\n\n\n\n\n\n\n        /* Styles for Accordion */\n        .toggle:last-child {\n          border-bottom: 1px solid #dddddd;\n        }\n        .toggle .toggle-title {\n          cursor: pointer;\n          position: relative;\n          display: block;\n          border-top: 1px solid #dddddd;\n          margin-bottom: 6px;\n        }\n        .toggle .toggle-title h3 {\n          font-size: 18px;\n          margin: 0px;\n          line-height: 1;\n          cursor: pointer;\n        /*  font-weight: 200; */\n         font-weight:400;\n        }\n        .toggle .toggle-inner {\n          padding: 7px 25px 10px 25px;\n          display: none;\n          margin: -7px 0 6px;\n        }\n        .toggle .toggle-inner div {\n          max-width: 100%;\n        }\n        .toggle .toggle-title .title-name {\n          display: block;\n          padding: 25px 25px 14px;\n        }\n        .toggle .toggle-title a i {\n          font-size: 22px;\n          margin-right: 5px;\n        }\n        .toggle .toggle-title i {\n          position: absolute;\n          background: url(\"http://arielbeninca.com/Storage/plus_minus.png\") 0px -24px no-repeat;\n          width: 24px;\n          height: 24px;\n          -webkit-transition: all 0.3s ease;\n          transition: all 0.3s ease;\n          margin: 22px;\n          right: -30px;\n        }\n        .toggle .toggle-title.active i {\n          background: url(\"http://arielbeninca.com/Storage/plus_minus.png\") 0px 0px no-repeat;\n        }\n\n\n\n\n  "],
            //  template: `  `,
            templateUrl: './app/pages/faq/faq.template.html'
        })
    ], FaqComponent);
    return FaqComponent;
}(app_component_1.AppComponent));
exports.FaqComponent = FaqComponent;
